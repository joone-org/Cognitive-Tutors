import { Document, model, Schema } from "mongoose";
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: String,
    email: String,
    phone: String,
    username: String,
    password: String,
    walletId: String,
    subscriptions: [String],
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE', 'DELETED']
    }
}, { timestamps: true })

export default model<IUser & Document>('User', userSchema);