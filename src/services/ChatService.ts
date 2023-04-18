import { Service } from "typedi";
import { IMessage } from "../interfaces/IMessage";
import { modelRepo, subscriptionRepo, userChatRepo } from "../repos";
import { OpenAIApi, Configuration } from "openai";
import config from "../config";
import { userServiceInstance, walletServiceInstance } from ".";
import { generateId } from "../helpers/util";
import { IUserChat } from "../interfaces/IUserChat";

@Service()
export class ChatService {

    private openai: OpenAIApi;

    constructor() {

        const configuration = new Configuration({
            apiKey: config.openAIKey,
        });
        this.openai = new OpenAIApi(configuration);

    }

    public async sendPrompt(userChatId: string, newMessages: IMessage[]) {

        const userChat = await this.getUserChatById(userChatId);
        const subscription = await this.getSubscriptionById(userChat.subscriptionId);
        const model = await this.getModelById(subscription.modelId);

        const user = await userServiceInstance.getUserById(userChat.userId);
        const totalMessages = userChat.history.concat(newMessages);

        const canAffordCall = await walletServiceInstance.canUserAffordChat(user, subscription, this.messagesToString(totalMessages));

        if (!canAffordCall) {
            throw Error("Available Balance Low. Please Recharge.")
        }

        const response = await this.openai.createChatCompletion({
            model: model.baseModelName,
            messages: totalMessages
        });

        const promptBack = response.data.choices[0].message;

        userChat.history.push(...totalMessages, promptBack);

        await Promise.all([
            userChat.save(),
            walletServiceInstance.chargeWallet(user.walletId, walletServiceInstance.calculatePrice(this.messagesToString(totalMessages), subscription), "CHAT")
        ])

        return promptBack
    }

    public messagesToString(totalMessages: IMessage[]) {
        return totalMessages.map(_ => _.role + ": " + _.content).join("\n");
    }

    public async getOrCreateUserChatByUserId(userId: string, pipe: IUserChat['pipe']) {
        const userChat = await userChatRepo.getUserChats({
            userId,
            pipe,
            status: 'ACTIVE'
        });

        if (userChat.length) return userChat[0];

        return userChatRepo.create({
            history: [],
            id: generateId(),
            pipe,
            status: 'ACTIVE',
            subscriptionId: 'DEFAULT_' + pipe,
            userId
        })
    }

    public getUserChatById(userChatId: string) {
        return userChatRepo.getUserChatById(userChatId);
    }

    public getModelById(modelId: string) {
        return modelRepo.getModelById(modelId);
    }

    public getSubscriptionById(subscriptionId: string) {
        return subscriptionRepo.getSubscriptionById(subscriptionId);
    }
}