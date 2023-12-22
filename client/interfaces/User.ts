import { StaticImageData } from "next/image";

export interface User {
    name: string,
    avatar: StaticImageData,
    username: string,
}