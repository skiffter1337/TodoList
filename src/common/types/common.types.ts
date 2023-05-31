export type ResponseType<T = {}> = {
    resultCode: number
    fieldErrors: string[]
    messages: string[]
    data: T
}

