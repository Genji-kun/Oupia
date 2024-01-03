import { User } from "./User"

export interface Post {
    postContent: string,
    isDeleted?: boolean,
    user: User
}