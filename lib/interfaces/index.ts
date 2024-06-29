import { AuthProvider } from "../enums"

export interface IUserLogin {
    username: string,
    password: string,
}

export interface ILoginSocial {
    accessToken: string,
    provider: AuthProvider
}

export interface IAcount {
    username?: string,
    password?: string,
    confirm?: string
}

export interface ITenantRequest {
    note: string,
    images: File[],
    startDate: Date
}
