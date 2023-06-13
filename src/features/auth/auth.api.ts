import {ResponseType} from "../../common/types";
import {instance} from "../../common/api/common.api";


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{userId: number}>>('auth/login', data)
    },
    me() {
        return instance.get<ResponseType<{data: UserType}>>('auth/me')
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    }
}


export type UserType = {
    id: number
    email: string
    login: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
