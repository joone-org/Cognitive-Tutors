import { Document, model, Schema } from "mongoose";
import { IWallet } from "../interfaces/IWallet";

const walletSchema = new Schema({
    id: String,
    balance: Number,
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE']
    }
});

export default model<IWallet & Document>("Wallet", walletSchema);