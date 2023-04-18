import { Document, FilterQuery, Model } from "mongoose";
import { Service } from "typedi";
import { IWalletLog } from "../interfaces/IWalletLog";

import WalletLogModel from '../models/wallet-log'

@Service()
export class WalletLogRepo {

    private WalletLogModel: Model<IWalletLog & Document>;

    constructor() {
        this.WalletLogModel = WalletLogModel
    }

    public async create(walletLogInput: IWalletLog) {
        return this.WalletLogModel.create(walletLogInput);
    }

    public async getWalletLogs(filter: FilterQuery<IWalletLog & Document<any, any, any>> = {}, select = '') {
        return this.WalletLogModel.find(filter).select(select);
    }

    public async getWalletLogById(walletLogId: IWalletLog['id'], select = '') {
        return this.WalletLogModel.findOne({
            walletLogId
        }).select(select);
    }

    public async updateOne(filter = {}, update: Partial<IWalletLog>) {
        delete update.id;

        return this.WalletLogModel.updateOne(filter, update);
    }

    public async updateMany(filter = {}, update: Partial<IWalletLog>) {
        delete update.id;

        return this.WalletLogModel.updateMany(filter, update)
    }

    public async delete(filter = {}) {
        return this.WalletLogModel.deleteMany(filter);
    }

}