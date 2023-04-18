import { Service } from 'typedi';
import UserChatModel from '../models/user-chat';
import { Document, FilterQuery, Model } from 'mongoose';
import { IUserChat } from '../interfaces/IUserChat';

@Service()
export class UserChatRepo {

    private UserChatModel: Model<IUserChat & Document>;

    constructor() {
        this.UserChatModel = UserChatModel
    }

    public async create(userChatInput: IUserChat) {
        return this.UserChatModel.create(userChatInput);
    }

    public async getUserChats(filter: FilterQuery<IUserChat & Document<any, any, any>> = {}, select = '') {
        return this.UserChatModel.find(filter).select(select);
    }

    public async getUserChatById(userChatId: IUserChat['id'], select = '') {
        return this.UserChatModel.findOne({
            userChatId
        }).select(select);
    }

    public async updateOne(filter = {}, update: Partial<IUserChat>) {
        delete update.id;

        return this.UserChatModel.updateOne(filter, update);
    }

    public async updateMany(filter = {}, update: Partial<IUserChat>) {
        delete update.id;

        return this.UserChatModel.updateMany(filter, update)
    }

    public async delete(filter = {}) {
        return this.UserChatModel.deleteMany(filter);
    }
}