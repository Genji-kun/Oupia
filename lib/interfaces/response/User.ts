import { UserRole } from "@/lib/enums";

export interface ICurrentUser {
    id: number,
    fullName: string,
    avatar: string,
    username: string,
    role: UserRole
}
