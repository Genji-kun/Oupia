import { UserRole } from "@/enums";

export interface IUserLogin {
    username: string;
    password: string;
}

export interface IUserRegister {
    username: string;
}


export interface ICurrentUser {
    id: number;
    fullName: string;
    avatar: string;
    username: string;
    role: UserRole;
}
