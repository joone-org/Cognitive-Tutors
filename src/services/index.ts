import Container from "typedi";
import { ChatService } from "./ChatService";
import { AuthService } from "./AuthService";
import { UserService } from "./UserService";
import { WalletService } from "./WalletService";
import { SMSService } from "./SMSService";

const authServiceInstance = Container.get(AuthService);
const chatServiceInstance = Container.get(ChatService);
const smsServiceInstance = Container.get(SMSService);
const userServiceInstance = Container.get(UserService);
const walletServiceInstance = Container.get(WalletService);

export {
    authServiceInstance,
    chatServiceInstance,
    smsServiceInstance,
    userServiceInstance,
    walletServiceInstance
}