import { Document, FilterQuery, Model } from "mongoose";
import { Service } from "typedi";
import { IUser } from "../interfaces/IUser";

import UserModel from '../models/user'

@Service()
export class UserRepo {

    private UserModel: Model<IUser & Document>;

    constructor() {
        this.UserModel = UserModel
    }

    public async create(userInput: IUser) {
        return this.UserModel.create(userInput);
    }

    public async getUsers(filter: FilterQuery<IUser & Document<any, any, any>> = {}, select = '') {
        return this.UserModel.find(filter).select(select);
    }

    public async getUserByUsername(username: string) {
        return this.UserModel.findOne({
            username
        })
    }

    public async getUserById(userId: IUser['id'], select = '-password -_id -__v') {
        return this.UserModel.findOne({
            userId
        }).select(select);
    }

    public async updateOne(filter = {}, update: Partial<IUser>) {
        delete update.id;

        return this.UserModel.updateOne(filter, update);
    }

    public async updateMany(filter = {}, update: Partial<IUser>) {
        delete update.id;

        return this.UserModel.updateMany(filter, update)
    }

    public async delete(filter = {}) {
        return this.UserModel.deleteMany(filter);
    }

}