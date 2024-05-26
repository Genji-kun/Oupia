import { Gender, UserRole } from "@/lib/types/enums";

export interface IUserLogin {
    username: string;
    password: string;
}

export interface IUserRegister {
    fullName?: string,
    phoneNumber?: string,
    email?: string,
    gender?: Gender,
    dob?: Date,
    avatar?: File,
    account?: IAcount,
}

export interface IAcount {
    username?: string,
    password?: string,
    confirm?: string,
}

export interface ICurrentUser {
    id: number;
    fullName: string;
    avatar: string;
    username: string;
    role: UserRole;
}
