import { z } from "zod";
import { AssetType } from "../types/enums";

const fileArraySchema = z.array(
    z.instanceof(File)
).refine(files => files.length >= 3, {
    message: "Hình ảnh nhà trọ cần ít nhất 3 hình ảnh"
});

const businessLicenseSchema = z.instanceof(File).optional();
const assetInfoSchema = z.object({
    assetName: z.string({
        required_error: "Tên nhà trọ không được để trống",
    }).min(1, {
        message: "Tên nhà trọ không được để trống"
    }),
    assetDescription: z.string({
        required_error: "Nội dung mô tả không được để trống",
    }),
    assetType: z.enum([
        AssetType.APARTMENT,
        AssetType.BOARDING_HOUSE,
        AssetType.DORMIROTY,
        AssetType.ENTIRE_HOUSE,
        AssetType.SHARED_HOUSING_SYSTEM,
        AssetType.STUDIO_APARTMENT
    ], {
        required_error: "Loại nhà trọ không được để trống"
    }),
    fullLocation: z.string({
        required_error: "Địa chỉ nhà trọ không được để trống",
    }).min(1, {
        message: "Địa chỉ nhà trọ không được để trống"
    }),
    locationLat: z.number(),
    locationLong: z.number(),
    price: z.string({
        required_error: "Giá thuê nhà trọ không được để trống",
    }).min(1, {
        message: "Giá thuê nhà trọ không được để trống"
    }),
    area: z.string({
        required_error: "Diện tích nhà trọ không được để trống",
    }).min(1, {
        message: "Diện tích nhà trọ không được để trống"
    }),
    maxPeople: z.string({
        required_error: "Số người thuê nhà trọ không được để trống",
    }).min(1, {
        message: "Số người thuê nhà trọ không được để trống"
    }),
    amenities: z.array(z.object({
        amenityName: z.string()
    })).nonempty({
        message: "Tiện ích nhà trọ không để trống"
    }),
    images: fileArraySchema,
    businessLicense: businessLicenseSchema
});

export const submitLandlordFormSchema = z.object({
    assetInfo: assetInfoSchema,
    note: z.string().min(1, {
        message: "Nội dung không được bỏ trống."
    }),
});