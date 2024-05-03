import { Post } from "./Post";
import { User } from "./User";

export interface Comment {
    content: string,
    post: Post,
    user: User,
}

export interface CommentRequest {
    commentContent: string,
    postId: number
}

export interface CommentResponse {
    id:number,
    postId: number,
    userId: number,
    avatar: string,
    fullName: string,
    username: string,
    role: "ROLE_TENANT" | "ROLE_ADMIN" | "ROLE_LANDLORD"
    commentContent: string,

    createdAt: Date,
    updatedAt: Date,
}
