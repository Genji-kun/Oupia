"use client"

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUploadContext } from '@/contexts/upload-context';
import { useDebounce } from '@/hooks/useDebounce';
import axios from 'axios';
import { CircleDollarSignIcon, MapPin, ThumbsUp, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import AmenityInput from './amenity-input';
import PriceInput from './price-input';
import { formatCurrency } from '@/utils/priceConvert';
import LocationInput from './location-input';

function TagsInputs() {

    const { selectedTagType, setSelectedTagType, setAmenities, amenities, locationTag, setLocationTag, tagPrice, setTagPrice } = useUploadContext();

    const handleRemoveAmenity = (name: string) => {
        setAmenities(amenities.filter((tag) => tag.amenityName !== name));
    }


    return (
        <div className="relative space-y-2">
            {(amenities.length > 0 || tagPrice || locationTag) &&
                <div className="flex flex-wrap gap-2">
                    {amenities.length > 0 && amenities.map((tag, index) => {
                        return <div key={index} className="flex items-center gap-2 bg-primary/20 text-primary border border-primary-500 rounded-lg px-3 py-2">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{tag.amenityName}</span>
                            <Button
                                variant={"ghost"}
                                className="rounded-full w-fit h-fit p-1 ml-2"
                                onClick={() => handleRemoveAmenity(tag.amenityName)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    })}
                    {tagPrice &&
                        <div className="flex items-center gap-2 bg-primary/20 text-primary border border-primary-500 rounded-lg px-3 py-2">
                            <CircleDollarSignIcon className="w-4 h-4" />
                            <span>{formatCurrency(tagPrice.minPrice)} - {formatCurrency(tagPrice.maxPrice)}đ</span>
                            <Button
                                variant={"ghost"}
                                className="rounded-full w-fit h-fit p-1 ml-2"
                                onClick={() => setTagPrice(undefined)}>
                                <X className="w-4 h-4" />
                            </Button>

                        </div>
                    }
                    {locationTag &&
                        <div className="flex items-center gap-2 bg-primary/20 text-primary border border-primary-500 rounded-lg px-3 py-2">
                            <MapPin className="w-4 h-4" />
                            <span>{locationTag.fullLocation}</span>
                            <Button
                                variant={"ghost"}
                                className="rounded-full w-fit h-fit p-1 ml-2"
                                onClick={() => setLocationTag(undefined)}>
                                <X className="w-4 h-4" />
                            </Button>

                        </div>
                    }
                </div>
            }
            <div className="flex gap-2">
                <Select defaultValue={selectedTagType} onValueChange={value => setSelectedTagType(value)}>
                    <SelectTrigger className="w-[180px] dark:bg-oupia-sub">
                        <SelectValue placeholder="Chọn tag đính kèm" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Loại tag đính kèm</SelectLabel>
                            <SelectItem value="amenity">Tiện ích</SelectItem>
                            <SelectItem value="price">Giá tiền</SelectItem>
                            <SelectItem value="location">Địa điểm</SelectItem>
                            <SelectItem value="asset">Thông tin căn hộ</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <>
                    {(() => {
                        switch (selectedTagType) {
                            case "amenity":
                                return <AmenityInput />
                            case "price":
                                return <PriceInput />
                            case "location":
                                return <LocationInput />
                            case "asset":
                            default:
                                return <></>
                        }
                    })()}
                </>
            </div>
        </div >
    )
}

export default TagsInputs;