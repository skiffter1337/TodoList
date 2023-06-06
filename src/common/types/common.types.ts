type FieldsErrorType = {
    error: string
    field: string
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldsErrorType[]
    data: T
}

