import { Service } from "typedi";
import config from "../config";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { userServiceInstance, walletServiceInstance } from ".";
import { IUser } from "../interfaces/IUser";
import { generateId } from "../helpers/util";

const SALT_WORK_FACTOR = 10;

@Service()
export class AuthService {

    public verifyToken(token: string, justJWTLoad = false) {
        let user = jwt.verify(token, config.jwtSecret);

        if (justJWTLoad) {
            return user;
        }

        if (user && parseInt(user['exp']) >= new Date().getTime()) {
            return user;
        } else if (user) {
            throw new Error("401");
        }

        throw new Error('Unauthorized Error')
    }

    public async userSignIn(username: string, password: string): Promise<{ user: IUser; token: string }> {
        const user = await userServiceInstance.getUserByUsername(username);
        if (!user) {
            throw new Error('Not Found');
        }

        try {

            if (await this.comparePassword(password, user.password)) {
                const token = this.generateToken(user.id);
                const client = user.toObject();

                Reflect.deleteProperty(client, 'password');
                Reflect.deleteProperty(client, '_id');
                Reflect.deleteProperty(client, '__v');

                return { user, token };
            }

            throw new Error()
        } catch (e) {
            throw new Error();
        }
    }

    private comparePassword(inputPassword: string, userPassword: string): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(inputPassword, userPassword, (err, isMatch) => {
                if (!isMatch) resolve(false);
                else resolve(true);
            })
        })
    }

    private generateToken(userId: string) {
        const exp = new Date();
        exp.setDate(exp.getDate() + 3);

        const jwtLoad = {
            userId: userId,
            exp: exp.getTime()
        }

        return jwt.sign(
            jwtLoad,
            config.jwtSecret
        );
    }

    public async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (err) {
            throw new Error('Server Error');
        }
    }

    public async userSignUp(userInput: IUser) {

        const isDuplicate = await userServiceInstance.getUserByUsername(userInput.username);

        if (isDuplicate) {
            throw new Error('400_Duplicate Information');
        }

        const userId = generateId();
        const walletId = generateId();

        userInput.password = await this.hashPassword(userInput.password)

        const wallet = await walletServiceInstance.addWallet({
            balance: 0,
            id: walletId,
            userId,
            status: 'ACTIVE'
        });

        const user = await userServiceInstance.create({
            ...userInput,
            walletId: wallet.id,
            id: userId,
            status: 'ACTIVE'
        });

        return user;

    }

}