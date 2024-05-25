import { Gender } from "@/enums";

export interface IRegisterInfoForm {
    fullName: string;
    phoneNumber: string;
    email: string;
    gender: Gender;
    dob: Date;
}

export interface IRegisterAccountForm {
    avatar: File;
    username: string;
    password: string;
    confirm: string;
}