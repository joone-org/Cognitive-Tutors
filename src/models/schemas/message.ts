import { Schema } from "mongoose";

export default new Schema({
    role: {
        type: String,
        enum: ['system', 'user', 'assistant']
    },
    content: String
});