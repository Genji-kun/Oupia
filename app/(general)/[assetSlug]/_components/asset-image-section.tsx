"use client"

import { useAssetDetailContext } from '@/contexts/asset-detail-context'
import { AssetImageProvider } from '@/contexts/view-asset-image';
import Image from 'next/image';
import React from 'react'
import AssetImageList from './asset-image-list';

function AssetImageSection() {
    const { asset, isFetching } = useAssetDetailContext();

    if (!asset) {
        return <></>
    }

    return (
        <>
            <Image src={asset.images[0]} alt="Asset Image" width={500} height={500} className="w-full aspect-video h-full object-cover lg:hidden" loading='lazy' />
            <div className="hidden lg:block">
                <AssetImageProvider>
                    <AssetImageList />
                </AssetImageProvider>
            </div>
        </>
    )
}

export default AssetImageSection
