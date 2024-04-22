"use client"

import { Amenity, TagLocation, TagPrice } from '@/interfaces/Tags';
import { usePathname } from 'next/navigation';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface IUploadContext {

    // Post Context

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

    // AssetContext 
    asset: any;
    setAsset: React.Dispatch<React.SetStateAction<any>>;

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
    // const [assetTags, setassetTags] = useState<any>([]);


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
        <UploadContext.Provider value={{ post, setPost, images, setImages, selectedTagType, setSelectedTagType, amenities, setAmenities, tagPrice, setTagPrice, tagLocation, setTagLocation, asset, setAsset }}>
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
