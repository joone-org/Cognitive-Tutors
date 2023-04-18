export interface IUser {
    id: string,
    name: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    walletId: string,
    subscriptions: string[],
    createdAt?: Date,
    status: 'ACTIVE' | 'INACTIVE' | 'DELETED'
}