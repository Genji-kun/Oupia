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


export interface AssetResponse {
    id: number,
    assetName: string,
    assetSlug: string,
    assetDescription: string,
    fullLocation: string,
    locationLat: number,
    locationLong: number,
    assetType: string,
    userId: number,
    price: number,
    area: number,
    maxPeople: number,
    amenities: string[],
    images: string[],
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date
}