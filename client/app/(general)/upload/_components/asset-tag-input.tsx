"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { assetsEndpoints } from '@/configs/axiosEndpoints';
import { authApi, publicApi } from '@/configs/axiosInstance';
import { useUploadContext } from '@/contexts/upload-context';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { isUndefined } from 'lodash-es';
import { Loader2, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';



function AssetTagInput() {

    const { tagAsset, setTagAsset } = useUploadContext();
    const { currentUser } = useSelector((state: any) => state.currentUserSlice);

    const [query, setQuery] = useState("");
    const [assets, setAssets] = useState<any[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);

    const inputRef = useRef<HTMLDivElement>(null);

    const fetchAssets = useDebounce(async (searchQuery: string) => {
        const res = searchQuery ? await publicApi.get(assetsEndpoints["assets"], {
            params: {
                keyword: searchQuery,
                userId: currentUser.id,
                size: 8
            }
        }) : await publicApi.get(assetsEndpoints["assets"], {
            params: {
                userId: currentUser.id,
                size: 8
            }
        });

        setAssets(res.data.content);
    }, 500);

    const handleSelectAsset = (asset: any) => {
        setQuery("");
        setTagAsset(asset);
        setShowResult(false);
    }

    const handleClickOutSide = (evt: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(evt.target as Node)) {
            setQuery("");
            setShowResult(false);
        }
    }

    const handleKeyDown = (evt: KeyboardEvent) => {
        if (evt.key === "Escape") {
            setQuery("");
            setShowResult(false);
        }
    }

    useEffect(() => {
        if(!tagAsset)
            setShowResult(assets.length > 0);
    }, [assets])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutSide);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [query])

    useEffect(() => {
        fetchAssets(query);
        return () => {
            fetchAssets.cancel();
        }
    }, [query, fetchAssets])

    return (
        <div className="relative space-y-2 w-full" ref={inputRef}>
            <div className="relative w-full h-fit">
                <Input
                    disabled={!isUndefined(tagAsset)}
                    value={tagAsset ? tagAsset.assetName : query}
                    onChange={(evt) => setQuery(evt.target.value)}
                    onFocus={(evt) => fetchAssets(evt.target.value)}
                    placeholder='Chọn thông tin căn hộ...' />
                {
                    tagAsset &&
                    <Button onClick={() => setTagAsset(undefined)} variant={"ghost"} className="w-fit h-fit p-1 absolute right-2 top-1/2 -translate-y-1/2">
                        <X className='w-4 h-4' />
                    </Button>
                }
            </div>
            <>
                {
                    showResult &&
                    <ScrollArea className="absolute z-10 bottom-2 max-h-72 w-full rounded border border-t-0 rounded-t-none py-2">
                        <div className="flex flex-col px-2 gap-1">
                            {assets.map((asset, index: number) => {
                                return (
                                    <>
                                        <Button
                                            variant="ghost"
                                            key={index}
                                            className="justify-start gap-2 w-full p-0"
                                            onClick={() => handleSelectAsset(asset)}>
                                            <Image
                                                width={500}
                                                height={500}
                                                className="w-10 aspect-square rounded"
                                                src={asset.images[0]}
                                                alt="Asset Image" />
                                            <span className="font-semibold">
                                                {asset.assetName}
                                            </span>
                                        </Button>
                                        <Separator />
                                    </>
                                );
                            })}
                        </div>
                    </ScrollArea>

                }
            </>
        </div>
    )
}

export default AssetTagInput;