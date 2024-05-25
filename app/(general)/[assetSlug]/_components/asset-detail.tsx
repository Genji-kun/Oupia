"use client"

import { Separator } from '@/components/ui/separator';
import React from 'react';
import { useAssetDetailContext } from '@/contexts/asset-detail-context';
import AssetMapSection from './asset-map-section';
import AssetIntroduceSection from './asset-introduce-section';
import AssetAmenitiesSection from './asset-amenities-section';
import AssetInfoSection from './asset-info-section';


const AssetDetail = () => {

    const { asset, isFetching } = useAssetDetailContext();

    if (!asset) {
        return <></>
    }

    return (
        <div className="w-full h-full flex flex-col gap-2">
            <AssetInfoSection />
            <Separator className="my-2" />
            <AssetIntroduceSection />
            <Separator className="my-2" />
            <AssetAmenitiesSection />
            <Separator className="my-2" />
            <AssetMapSection />
        </div>
    );
};

export default AssetDetail;