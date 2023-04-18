import { IMessage } from "./IMessage";

export interface IUserChat {
    id: string,
    userId: string,
    history: IMessage[],
    subscriptionId: string,
    pipe: 'SMS' | 'WEB' | 'DISCORD'
    status: 'ACTIVE' | 'INACTIVE'
}