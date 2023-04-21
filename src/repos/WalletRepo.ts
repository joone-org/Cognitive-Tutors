import { Document, FilterQuery, Model } from "mongoose";
import { Service } from "typedi";
import { IWallet } from "../interfaces/IWallet";

import WalletModel from '../models/wallet'

@Service()
export class WalletRepo {

    private WalletModel: Model<IWallet & Document>;

    constructor() {
        this.WalletModel = WalletModel
    }

    public async create(walletInput: IWallet) {
        return this.WalletModel.create(walletInput);
    }

    public async getWallets(filter: FilterQuery<IWallet & Document<any, any, any>> = {}, select = '') {
        return this.WalletModel.find(filter).select(select);
    }

    public async getWalletById(walletId: IWallet['id'], select = '') {
        return this.WalletModel.findOne({
            id: walletId
        }).select(select);
    }

    public async updateOne(filter = {}, update: Partial<IWallet>) {
        delete update.id;

        return this.WalletModel.updateOne(filter, update);
    }

    public async updateMany(filter = {}, update: Partial<IWallet>) {
        delete update.id;

        return this.WalletModel.updateMany(filter, update)
    }

    public async delete(filter = {}) {
        return this.WalletModel.deleteMany(filter);
    }

}