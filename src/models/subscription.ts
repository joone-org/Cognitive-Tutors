import { Document, model, Schema } from "mongoose";
import { ISubscription } from "../interfaces/ISubscription";
import { SubscriptionRepo } from "../repos/SubscriptionRepo";

const subscriptionSchema = new Schema({
    id: String,
    name: String,
    description: String,
    modelId: String,
    rate: Number
});

export default model<ISubscription & Document>("Subscription", subscriptionSchema);