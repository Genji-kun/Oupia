import { AssetType } from "../enums"

export type Account = {
    username?: string,
    password?: string,
    confirm?: string
}

export type AssetInfo = {
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

export type Amenity = {
    amenityName: string
}

export type Image = {
    id: number,
    url: string
}