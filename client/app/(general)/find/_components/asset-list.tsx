"use client"

import React from 'react';
import AssetItem from './asset-item';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/configs/axiosInstance';
import { assetsEndpoints } from '@/configs/axiosEndpoints';
import AssetSkeleton from './asset-skeleton';

const fetchAssets = async () => {
    const res = await publicApi.get(assetsEndpoints["assets"]);
    return res.data.content;
};

const AssetList = () => {

    const { data: assets, isLoading } = useQuery({
        queryKey: ['assets'],
        queryFn: fetchAssets
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                <AssetSkeleton />
                <AssetSkeleton />
                <AssetSkeleton />
                <AssetSkeleton />
                <AssetSkeleton />
                <AssetSkeleton />
            </div>);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 flex-grow">
            <>
                {assets && assets.map((asset: any, index: number) => {
                    return <React.Fragment key={index}>
                        <AssetItem asset={asset} />
                    </React.Fragment>
                })}
            </>
        </div>
    );
};

export default AssetList;