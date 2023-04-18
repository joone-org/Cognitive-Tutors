import { Service } from "typedi";
import { userRepo } from "../repos";
import { IUser } from "../interfaces/IUser";
import { generateId } from "../helpers/util";
import { walletServiceInstance } from ".";

@Service()
export class UserService {

    public getUserByUsername(username: string) {
        return userRepo.getUserByUsername(username);
    }

    public getUserById(userId: string) {
        return userRepo.getUserById(userId);
    }

    public create(userInput: IUser) {
        return userRepo.create(userInput);
    }

    public async getUserByPhone(phone: string) {
        const users = await userRepo.getUsers({
            phone
        });

        return users[0];
    }

    public async getOrCreateUserSMS(phone: string) {
        const user = await this.getUserByPhone(phone);

        if (user) return user;

        const walletId = generateId();
        const userId = generateId();

        const wallet = await walletServiceInstance.addWallet({
            balance: 0,
            id: walletId,
            status: 'ACTIVE',
            userId: userId
        })

        return this.create({
            id: userId,
            email: '',
            name: '',
            password: '',
            phone,
            status: 'ACTIVE',
            subscriptions: [],
            username: phone,
            walletId
        })
    }
}