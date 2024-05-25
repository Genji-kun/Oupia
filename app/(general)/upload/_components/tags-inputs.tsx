"use client"

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUploadContext } from '@/contexts/upload-context';
import { CircleDollarSignIcon, MapPin, ThumbsUp, X } from 'lucide-react';
import React from 'react'
import PriceInput from './price-input';
import { formatCurrency } from '@/utils/priceConvert';
import LocationInput from './location-input';
import Image from 'next/image';
import AssetTagInput from './asset-tag-input';
import { useSelector } from 'react-redux';

function TagsInputs() {

    const { selectedTagType, setSelectedTagType, tagLocation, setTagLocation, tagPrice, setTagPrice, tagAsset, setTagAsset } = useUploadContext();
    const { currentUser } = useSelector((state: any) => state.currentUserSlice);


    return (
        <div className="relative space-y-2">
            {(tagPrice || tagLocation || tagAsset) &&
                <div className="flex flex-wrap gap-2">
                    {tagPrice &&
                        <div className="flex items-center gap-1.5 bg-primary/20 text-primary border border-primary-500 rounded-lg h-fit px-3 py-1.5">
                            <CircleDollarSignIcon className="w-4 h-4" />
                            <span>{formatCurrency(tagPrice.minPrice)} - {formatCurrency(tagPrice.maxPrice)}đ</span>
                            <Button
                                variant={"ghost"}
                                className="rounded-full w-fit h-fit p-1"
                                onClick={() => setTagPrice(undefined)}>
                                <X className="w-4 h-4" />
                            </Button>

                        </div>
                    }
                    {tagLocation &&
                        <div className="flex items-center gap-1.5 bg-primary/20 text-primary border border-primary-500 rounded-lg h-fit px-3 py-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{tagLocation.fullLocation}</span>
                            <Button
                                variant={"ghost"}
                                className="rounded-full w-fit h-fit p-1"
                                onClick={() => setTagLocation(undefined)}>
                                <X className="w-4 h-4" />
                            </Button>

                        </div>
                    }
                    {tagAsset &&
                        <div className="flex items-center gap-1.5 bg-primary/20 text-primary border border-primary-500 rounded-lg h-fit overflow-hidden pr-2">
                            <Image height={500} width={500} src={tagAsset.images[0]} alt="Asset Image" className="h-full aspect-square w-12" />
                            <span className="pl-2">[Đã đính kèm]</span>
                            <Button
                                variant={"ghost"}
                                className="rounded-full w-fit h-fit p-1"
                                onClick={() => setTagAsset(undefined)}>
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
                            <SelectItem value="price">Giá tiền</SelectItem>
                            <SelectItem value="location">Địa điểm</SelectItem>
                            {currentUser.role !== "ROLE_TENANT" && <SelectItem value="asset">Thông tin căn hộ</SelectItem>}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <>
                    {(() => {
                        switch (selectedTagType) {
                            case "price":
                                return <PriceInput />
                            case "location":
                                return <LocationInput />
                            case "asset":
                                return <AssetTagInput />
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