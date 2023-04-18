export interface IModel {
    id: string,
    name: string,
    settings: object,
    prompt: string,
    variables: {
        name: string,
        type: 'TEXT' | 'SELECT',
        options: string[],
        default: string
    }[]
    status: 'ACTIVE' | 'INACTIVE'
}