import { Account } from "@/lib/types";
import { Gender } from "../../enums";

export interface IUserRegister {
    fullName?: string,
    phoneNumber?: string,
    email?: string,
    gender?: Gender,
    dob?: Date,
    avatar?: File,
    account?: Account
}
