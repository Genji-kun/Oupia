import { AssetType } from "@/lib/enums";
import { Amenity } from "@/lib/types";

export interface IAssetItem {
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
    amenities: Amenity[],
    images: string[],
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface IAssetInformation {
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