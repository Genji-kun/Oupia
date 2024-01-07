import { Post } from "./Post";
import { User } from "./User";

export interface Comment {
    content: string,
    post: Post,
    user: User,
}