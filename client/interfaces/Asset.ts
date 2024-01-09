import { Image } from "./Image";
import { User } from "./User";

export interface Asset {
    name: string,
    description: string,
    slug: string,
    location: string,
    createAt?: Date,
    isDeleted?: boolean,
    user: User,
    assetType: AssetType,
    imageList: Image[],
    price?: number
}

export interface AssetType {
    name: string
}