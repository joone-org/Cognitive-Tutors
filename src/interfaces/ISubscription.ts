export interface ISubscription {
    id: string,
    name: string,
    description: string,
    modelId: string,
    defaultVariableValues: {
        name: string,
        value: string
    }[],
    rate: number
    // settings: object
}