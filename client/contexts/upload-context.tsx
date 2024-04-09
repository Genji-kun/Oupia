"use client"

import { Amenity, TagLocation, TagPrice } from '@/interfaces/Tags';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';

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
    locationTag: TagLocation | undefined;
    setLocationTag: React.Dispatch<React.SetStateAction<TagLocation | undefined>>;
}

const UploadContext = createContext<IUploadContext | undefined>(undefined);

export const UploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [post, setPost] = useState<any>({});
    const [images, setImages] = useState<File[]>([]);
    const [selectedTagType, setSelectedTagType] = useState<string>("amenity");
    const [amenities, setAmenities] = useState<Amenity[]>([]);
    const [tagPrice, setTagPrice] = useState<TagPrice | undefined>();
    const [locationTag, setLocationTag] = useState<TagLocation | undefined>();
    // const [assetTags, setassetTags] = useState<any>([]);


    useEffect(() => {
        if (tagPrice) {
            setPost((prev: any) => {
                return { ...prev, tagPrice: tagPrice }
            })
        } else {
            setPost((prev: any) => {
                const newPost = { ...prev };
                delete newPost.tagPrice;
                return newPost;
            })
        }
    }, [tagPrice])


    useEffect(() => {
        if (amenities) {
            setPost((prev: any) => {
                return { ...prev, amenities: amenities }
            })
        } else {
            setPost((prev: any) => {
                const newPost = { ...prev };
                delete newPost.amenities;
                return newPost;
            })
        }
    }, [amenities])

    return (
        <UploadContext.Provider value={{ post, setPost, images, setImages, selectedTagType, setSelectedTagType, amenities, setAmenities, tagPrice, setTagPrice, locationTag, setLocationTag }}>
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
