
export interface User {
    fullName?: string,
    phoneNumber?: string,
    email?: string,
    gender?: "MALE" | "FEMALE" | "ORTHER",
    dob?: Date,
    avatar?: any,
    account?: Account,
    roles?: "ROLE_ADMIN" | "ROLE_LANDLORD" | "ROLE_TENANT",
}

export interface Account {
    username: string,
    password?: string,
    confirm?: string,
}