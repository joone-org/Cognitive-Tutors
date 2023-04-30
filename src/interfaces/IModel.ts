import { IMessage } from "./IMessage"

export interface IModel {
    id: string,
    name: string,
    settings: object,
    defaultPrompt: IMessage[],
    variables: {
        name: string,
        type: 'TEXT' | 'SELECT',
        options: string[],
        default: string
    }[]
    status: 'ACTIVE' | 'INACTIVE'
}