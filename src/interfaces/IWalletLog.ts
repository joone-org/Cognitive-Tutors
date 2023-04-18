export interface IWalletLog {
    id: string,
    walletId: string,
    amount: number,
    purpose: string,
    type: 'CREDIT' | 'DEBIT', // CREDIT - TAKE, DEBIT - ADD
    createdAt?: Date,
    updatedAt?: Date
}