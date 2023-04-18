import { Document, FilterQuery, Model } from "mongoose";
import { Service } from "typedi";
import { IModel } from "../interfaces/IModel";

import ModelModel from '../models/model'

@Service()
export class ModelRepo {

    private ModelModel: Model<IModel & Document>;

    constructor() {
        this.ModelModel = ModelModel
    }

    public async create(modelInput: IModel) {
        return this.ModelModel.create(modelInput);
    }

    public async getModels(filter: FilterQuery<IModel & Document<any, any, any>> = {}, select = '') {
        return this.ModelModel.find(filter).select(select);
    }

    public async getModelById(modelId: IModel['id'], select = '') {
        return this.ModelModel.findOne({
            modelId
        }).select(select);
    }

    public async updateOne(filter = {}, update: Partial<IModel>) {
        delete update.id;

        return this.ModelModel.updateOne(filter, update);
    }

    public async updateMany(filter = {}, update: Partial<IModel>) {
        delete update.id;

        return this.ModelModel.updateMany(filter, update)
    }

    public async delete(filter = {}) {
        return this.ModelModel.deleteMany(filter);
    }

}