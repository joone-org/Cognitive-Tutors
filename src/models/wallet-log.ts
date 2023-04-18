import { Document, Schema, model } from "mongoose";
import { IWalletLog } from "../interfaces/IWalletLog";

const walletLogSchema = new Schema({
    id: String,
    walletId: String,
    amount: Number,
    purpose: String,
    type: {
        type: String,
        enum: ['CREDIT', 'DEBIT']
    }
}, { timestamps: true });

export default model<IWalletLog & Document>("WalletLog", walletLogSchema);