import Container from "typedi";
import { ModelRepo } from "./ModelRepo";
import { SubscriptionRepo } from "./SubscriptionRepo";
import { UserRepo } from "./UserRepo";
import { WalletRepo } from "./WalletRepo";
import { UserChatRepo } from "./UserChatRepo";
import { WalletLogRepo } from "./WalletLogRepo";
import { PaymentRepo } from "./PaymentRepo";

const modelRepo = Container.get(ModelRepo);
const paymentRepo = Container.get(PaymentRepo);
const subscriptionRepo = Container.get(SubscriptionRepo);
const userChatRepo = Container.get(UserChatRepo);
const userRepo = Container.get(UserRepo);
const walletRepo = Container.get(WalletRepo);
const walletLogRepo = Container.get(WalletLogRepo);

export {
    modelRepo,
    paymentRepo,
    subscriptionRepo,
    userChatRepo,
    userRepo,
    walletRepo,
    walletLogRepo
}