import { Document, Schema, model } from "mongoose";
import { IPayment } from "../interfaces/IPayment";

const paymentSchema = new Schema({
    id: String,
    walletId: String,
    amount: Number,
    pogs: Number,
    stripePayload: Object,
    status: {
        type: String,
        enum: ['STARTED', 'PROCESSING', 'COMPLETED', 'CANCELLED']
    }
}, { timestamps: true });

export default model<IPayment & Document>("Payment", paymentSchema);