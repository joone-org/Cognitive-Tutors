export interface IWallet {
    id: string,
    balance: number,
    userId: string,
    updatedAt?: string,
    status: 'ACTIVE' | 'INACTIVE'
}