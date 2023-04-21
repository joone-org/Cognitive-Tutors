import { Document, model, Schema } from "mongoose";
import { IModel } from "../interfaces/IModel";

const modelSchema = new Schema({
    id: String,
    name: String,
    setting: Object,
    prompt: String,
    variables: [{
        name: String,
        type: {
            type: String,
            enum: ['TEXT', 'SELECT']
        },
        options: [String],
        default: String
    }],
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE']
    }
});

export default model<IModel & Document>("Model", modelSchema);