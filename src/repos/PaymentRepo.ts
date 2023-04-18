import { Document, FilterQuery, Model } from "mongoose";
import { Service } from "typedi";
import { IPayment } from "../interfaces/IPayment";

import PaymentModel from '../models/payment'

@Service()
export class PaymentRepo {

    private PaymentModel: Model<IPayment & Document>;

    constructor() {
        this.PaymentModel = PaymentModel
    }

    public async create(paymentInput: IPayment) {
        return this.PaymentModel.create(paymentInput);
    }

    public async getPayments(filter: FilterQuery<IPayment & Document<any, any, any>> = {}, select = '') {
        return this.PaymentModel.find(filter).select(select);
    }

    public async getPaymentById(paymentId: IPayment['id'], select = '') {
        return this.PaymentModel.findOne({
            paymentId
        }).select(select);
    }

    public async updateOne(filter = {}, update: Partial<IPayment>) {
        delete update.id;

        return this.PaymentModel.updateOne(filter, update);
    }

    public async updateMany(filter = {}, update: Partial<IPayment>) {
        delete update.id;

        return this.PaymentModel.updateMany(filter, update)
    }

    public async delete(filter = {}) {
        return this.PaymentModel.deleteMany(filter);
    }

}