
export interface User {
    fullName?: string,
    phoneNumber?: string,
    email?: string,
    gender?: "MALE" | "FEMALE" | "OTHER",
    dob?: Date,
    avatar?: any,
    account?: Account,
    roles?: "ROLE_ADMIN" | "ROLE_LANDLORD" | "ROLE_TENANT",
}

export interface CurrentUser {
    id: number,
    fullName: string,
    avatar: string,
    username: string,
    role: "ROLE_ADMIN" | "ROLE_LANDLORD" | "ROLE_TENANT"
}


export interface UserInfo {
    id: string,
    fullName: string,
    avatar: string,
    username: string,
    role: "ROLE_ADMIN" | "ROLE_LANDLORD" | "ROLE_TENANT",
    createdAt: Date,
    totalFollower: number,
}

export interface Account {
    username: string,
    password?: string,
    confirm?: string,
}

export interface Follower {
    userId: number,
    username: string,
    avatar: string,
    fullName: string,
    role: "ROLE_ADMIN" | "ROLE_LANDLORD" | "ROLE_TENANT",
}

export interface SearchUser {
    id: number,
    fullName: string,
    avatar: string,
    username: string,
    role: "ROLE_TENANT" | "ROLE_LANDLORD" | "ROLE_ADMIN"
}
