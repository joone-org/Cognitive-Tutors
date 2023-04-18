import { Service } from "typedi";
import { IWallet } from "../interfaces/IWallet";
import { paymentRepo, walletLogRepo, walletRepo } from "../repos";
import { encode } from "gpt-3-encoder";
import { ISubscription } from "../interfaces/ISubscription";
import { IWalletLog } from "../interfaces/IWalletLog";
import { generateId, generateLongId } from "../helpers/util";
import { IUser } from "../interfaces/IUser";
import Stripe from "stripe";
import config from "../config";

@Service()
export class WalletService {

    private stripe: Stripe;
    private PAYMOUNT_ITEMS = [{
        amount: 5,
        name: "Message Pack",
        quantity: 1,
        pogs: 500
    }]

    constructor() {
        this.stripe = new Stripe(config.stripeAPIKey, {
            apiVersion: '2022-11-15',
        });
    }

    public async addWallet(walletInput: IWallet) {
        return walletRepo.create(walletInput);
    }

    public async canUserAffordChat(user: IUser, subscription: ISubscription, totalMessages: string) {

        const wallet = await this.getWalletById(user.walletId);

        const price = this.calculatePrice(totalMessages, subscription);

        if (wallet.balance >= price) {
            return true;
        }

        return false;

    }

    public calculatePrice(totalMessageString: string, subscription: ISubscription) {
        return encode(totalMessageString).length * subscription.rate
    }

    public async chargeWallet(walletId: string, amount: number, purpose: string = "") {
        const wallet = await this.getWalletById(walletId);
        wallet.balance -= amount;

        return Promise.all([
            this.addWalletLog({
                id: generateId(),
                amount,
                purpose,
                type: 'CREDIT',
                walletId
            }),
            wallet.save()
        ]);
    }

    public async generatePayment(walletId: string) {
        const paymentId = generateLongId(15);
        const stripePaymentPayload = await this.stripe.checkout.sessions.create({
            success_url: config.baseUrl + "/api/purchase/confirm?id=" + paymentId,
            cancel_url: config.baseUrl + "/api/purchase/cancel?id=" + paymentId,
            payment_method_types: ['card'],
            line_items: this.PAYMOUNT_ITEMS.map(item => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.amount * 100
                    },
                    quantity: item.quantity
                }
            })
        });

        await paymentRepo.create({
            id: paymentId,
            stripePayload: stripePaymentPayload,
            amount: this.PAYMOUNT_ITEMS.map(_ => _.amount).reduce((a, b) => a + b),
            pogs: this.PAYMOUNT_ITEMS.map(_ => _.pogs).reduce((a, b) => a + b),
            status: 'PROCESSING',
            walletId: walletId
        })

        return stripePaymentPayload.url
    }

    public addWalletLog(input: IWalletLog) {
        return walletLogRepo.create(input);
    }

    public getWalletById(walletId: string) {
        return walletRepo.getWalletById(walletId);
    }

    public async confirmPayment(paymentId: string) {
        const payment = await this.getPaymentById(paymentId);
        const wallet = await this.getWalletById(payment.walletId);

        wallet.balance += payment.pogs;
        payment.status = 'COMPLETED';

        return Promise.all([
            wallet.save(),
            payment.save()
        ])
    }

    public cancelPayment(paymentId: string) {
        return paymentRepo.updateOne({
            paymentId
        }, {
            status: 'CANCELLED'
        })
    }

    private getPaymentById(paymentId: string) {
        return paymentRepo.getPaymentById(paymentId);
    }

}