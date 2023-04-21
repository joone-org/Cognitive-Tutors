import { Document, Schema, model } from "mongoose";
import { IUserChat } from "../interfaces/IUserChat";
import message from "./schemas/message";

const userChatSchema = new Schema({
    id: String,
    userId: String,
    history: [message],
    subscriptionId: String,
    pipe: {
        type: String,
        enum: ['SMS', 'WEB', 'DISCORD']
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE']
    }
});

export default model<IUserChat & Document>("UserChat", userChatSchema);