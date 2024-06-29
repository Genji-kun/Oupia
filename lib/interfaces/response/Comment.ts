import { UserRole } from "../../enums";

export interface ICommentItem {
    id: number,
    postId: number,
    userId: number,
    avatar: string,
    fullName: string,
    username: string,
    role: UserRole
    commentContent: string,
    createdAt: Date,
    updatedAt: Date,
}
