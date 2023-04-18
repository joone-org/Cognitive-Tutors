import { Document, FilterQuery, Model } from "mongoose";
import { Service } from "typedi";
import { ISubscription } from "../interfaces/ISubscription";

import SubscriptionModel from '../models/subscription'

@Service()
export class SubscriptionRepo {

    private SubscriptionModel: Model<ISubscription & Document>;

    constructor() {
        this.SubscriptionModel = SubscriptionModel
    }

    public async create(subscriptionInput: ISubscription) {
        return this.SubscriptionModel.create(subscriptionInput);
    }

    public async getSubscriptions(filter: FilterQuery<ISubscription & Document<any, any, any>> = {}, select = '') {
        return this.SubscriptionModel.find(filter).select(select);
    }

    public async getSubscriptionById(subscriptionId: ISubscription['id'], select = '') {
        return this.SubscriptionModel.findOne({
            subscriptionId
        }).select(select);
    }

    public async updateOne(filter = {}, update: Partial<ISubscription>) {
        delete update.id;

        return this.SubscriptionModel.updateOne(filter, update);
    }

    public async updateMany(filter = {}, update: Partial<ISubscription>) {
        delete update.id;

        return this.SubscriptionModel.updateMany(filter, update)
    }

    public async delete(filter = {}) {
        return this.SubscriptionModel.deleteMany(filter);
    }

}