export interface IPayment {
    id: string,
    walletId: string,
    amount: number,
    pogs: number,
    stripePayload: object,
    status: 'STARTED' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'
}