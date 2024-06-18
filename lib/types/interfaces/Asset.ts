import { AssetType } from "../enums";
import { Image } from "./Image";
import { Amenity } from "./Tags";
import { User } from "./User";

export interface Asset {
    name: string,
    description: string,
    slug: string,
    location: string,
    createAt?: Date,
    isDeleted?: boolean,
    user: User,
    // assetType: AssetType,
    imageList: Image[],
    price?: number
}

// export interface AssetType {
//     name: string
// }


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
    amenities: { amenityName: string }[],
    images: string[],
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface AssetInfo {
    assetName: string,
    assetDescription: string,
    assetType: AssetType,
    fullLocation: string,
    locationLat: number,
    locationLong: number,
    price: string,
    area: string,
    maxPeople: string,
    amenities: Amenity[],
    images: File[],
    businessLicense: File
}

export interface ISubmitLandlordForm {
    assetInfo: AssetInfo,
    note: string,
}

