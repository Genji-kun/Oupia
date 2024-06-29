"use client"

import { TagLocation, TagPrice } from '@/lib/interfaces/Tags';
import { IAssetItem } from '@/lib/interfaces/response/Asset';
import { Amenity } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import * as z from "zod"

interface IUploadContext {

    post: any;
    setPost: React.Dispatch<React.SetStateAction<any>>;
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    selectedTagType: string;
    setSelectedTagType: React.Dispatch<React.SetStateAction<string>>;
    amenities: Amenity[];
    setAmenities: React.Dispatch<React.SetStateAction<Amenity[]>>;
    tagPrice: TagPrice | undefined;
    setTagPrice: React.Dispatch<React.SetStateAction<TagPrice | undefined>>;
    tagLocation: TagLocation | undefined;
    setTagLocation: React.Dispatch<React.SetStateAction<TagLocation | undefined>>;
    tagAsset: IAssetItem | undefined;
    setTagAsset: React.Dispatch<React.SetStateAction<IAssetItem | undefined>>;

    // AssetContext 
    asset: any;
    setAsset: React.Dispatch<React.SetStateAction<any>>;

    postForm: UseFormReturn<PostReq, any, undefined>;

    assetForm: UseFormReturn<AssetReq, any, undefined>

}

export type PostReq = {
    postContent: string;
    postType: "POST_COMMON" | "POST_RENT" | "POST_FIND";
    images: File[];
};

export type AssetReq = {
    assetName: string;
    assetType: "BOARDING_HOUSE" | "SHARED_HOUSING_SYSTEM" | "APARTMENT" | "DORMIROTY" | "STUDIO_APARTMENT" | "ENTIRE_HOUSE";
    assetDescription: string;
    fullLocation: string;
    locationLong: number;
    locationLat: number;
    price: number;
    area: number;
    maxPeople: number;
    amenities: string[];
    images: File[];
}

const UploadContext = createContext<IUploadContext | undefined>(undefined);

export const UploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // Genernal Context

    const pathname = usePathname();
    const [images, setImages] = useState<File[]>([]);

    useEffect(() => {
        setPost({});
        setAsset({});
        setImages([]);
    }, [pathname])

    // Post Context

    const [post, setPost] = useState<any>({});
    const [selectedTagType, setSelectedTagType] = useState<string>("price");
    const [amenities, setAmenities] = useState<Amenity[]>([]);
    const [tagPrice, setTagPrice] = useState<TagPrice | undefined>();
    const [tagLocation, setTagLocation] = useState<TagLocation | undefined>();
    const [tagAsset, setTagAsset] = useState<IAssetItem | undefined>();

    const formPostSchema = z.object({
        postContent: z.string({
            required_error: "Nội dung không được để trống",
        }).min(20, {
            message: "Nội dung phải lớn hơn 20 kí tự"
        }),
        postType: z.enum(['POST_COMMON', 'POST_RENT', 'POST_FIND'], {
            required_error: "Chưa chọn loại bài viết"
        }),
        images: z.array(z.instanceof(File))
    })

    const formAssetSchema = z.object({
        assetName: z.string({
            required_error: "Tên căn hộ không được để trống",
        }).min(10, {
            message: "Tên căn hộ phải lớn hơn 10 kí tự"
        }),
        assetType: z.enum(['BOARDING_HOUSE', 'SHARED_HOUSING_SYSTEM', 'APARTMENT', 'DORMIROTY', 'STUDIO_APARTMENT', 'ENTIRE_HOUSE'], {
            required_error: "Chưa chọn loại căn hộ"
        }),
        assetDescription: z.string({
            required_error: "Nội dung mô tả không được để trống",
        }).min(50, {
            message: "Nội dung mô tả phải lớn hơn 50 kí tự"
        }),
        fullLocation: z.string({
            required_error: "Địa chỉ không được để trống",
        }),
        locationLong: z.number({
            required_error: "Địa chỉ không được để trống",
        }),
        locationLat: z.number({
            required_error: "Địa chỉ không được để trống",
        }),
        price: z.number({
            required_error: "Giá không được để trống",
        }).min(1, {
            message: "Giá phải là số dương"
        }),
        area: z.number({
            required_error: "Diện tích không được để trống",
        }).min(1, {
            message: "Diện tích phải là số dương"
        }),
        maxPeople: z.number({
            required_error: "Số người tối đa không được để trống",
        }).min(1, {
            message: "Số người tối đa phải là số dương"
        }),
        amenities: z.array(z.string()),
        images: z.array(z.instanceof(File))
    })

    const assetForm = useForm<AssetReq>({
        resolver: zodResolver(formAssetSchema),
        defaultValues: {
            assetName: "",
            assetType: undefined,
            assetDescription: "",
            fullLocation: "",
            locationLong: undefined,
            locationLat: undefined,
            price: undefined,
            area: undefined,
            maxPeople: undefined,
            amenities: [],
            images: []
        },
    })

    const postForm = useForm<PostReq>({
        resolver: zodResolver(formPostSchema),
        defaultValues: {
            postContent: "",
            postType: undefined,
            images: []
        },
    })

    useEffect(() => {
        if (tagPrice) {
            setPost((prev: any) => {
                return { ...prev, tagPrice: tagPrice }
            })
        } else {
            setPost((prev: any) => {
                const { tagPrice, ...newPost } = prev;
                return newPost;
            })
        }
    }, [tagPrice])

    useEffect(() => {
        if (tagAsset) {
            setPost((prev: any) => {
                return { ...prev, assetId: tagAsset.id }
            })
            setImages([]);
        } else {
            setPost((prev: any) => {
                const { assetId, ...newPost } = prev;
                return newPost;
            })
        }
    }, [tagAsset])

    useEffect(() => {
        const subscription = postForm.watch((values: any) => {
            for (const key in values) {
                if (values[key] && key !== "images") {
                    if (key === "postType" || key === "postContent") {
                        setPost((current: any) => {
                            return { ...current, [key]: values[key] };
                        });
                    }
                }
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [postForm]);

    useEffect(() => {
        if (amenities.length > 0) {
            if (pathname === "/upload/asset") {
                setAsset((prev: any) => {
                    return { ...prev, amenities: amenities }
                })
            } else {
                setPost((prev: any) => {
                    return { ...prev, amenities: amenities }
                })
            }

        } else {
            if (pathname === "/upload/asset") {
                setAsset((prev: any) => {
                    const { amenities, ...newAsset } = prev;
                    return newAsset;
                })
            } else {
                setPost((prev: any) => {
                    const { amenities, ...newPost } = prev;
                    return newPost;
                })
            }
        }
    }, [amenities]);

    // Asset Context
    const [asset, setAsset] = useState<any>({});


    return (
        <UploadContext.Provider value={{ post, setPost, images, setImages, selectedTagType, setSelectedTagType, amenities, setAmenities, tagPrice, setTagPrice, tagLocation, setTagLocation, tagAsset, setTagAsset, asset, setAsset, postForm, assetForm }}>
            {children}
        </UploadContext.Provider>
    );
};


export const useUploadContext = (): IUploadContext => {
    const context = useContext(UploadContext);
    if (!context) {
        throw new Error('useUploadContext phải được dùng trong UploadProvider');
    }
    return context;
};
