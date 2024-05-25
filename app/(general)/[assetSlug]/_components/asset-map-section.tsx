"use client"

import React from 'react'
import MapRoute from './map-route';

import { Button } from '@/components/ui/button';
import { TbLocationSearch } from 'react-icons/tb';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAssetDetailContext } from '@/contexts/asset-detail-context';
import { notFound } from 'next/navigation';
import { X } from 'lucide-react';

function AssetMapSection() {

    const { asset, isOpenSearch, setIsOpenSearch } = useAssetDetailContext();

    if (!asset) {
        notFound();
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="font-montserrat font-bold text-xl lg:text-3xl">Địa điểm</h1>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={() => setIsOpenSearch(prev => !prev)} variant={"ghost"} className="w-fit h-fit p-3 rounded-full">
                                {isOpenSearch ? <X className="w-5 h-5" /> : <TbLocationSearch className="w-5 h-5" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent align='center'>
                            <p>{isOpenSearch ? "Đóng" : "Tìm đường đi đến căn hộ"}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-muted-foreground text-base">{asset.fullLocation}</h3>
                <MapRoute />
            </div>
        </>
    )
}

export default AssetMapSection
