"use client"

import React from 'react';
import AssetItem from './asset-item';
import AssetSkeleton from './asset-skeleton';
import { useFindAssetContext } from '@/contexts/find-asset-context';

const AssetList = () => {
    const {assets, isFetching} = useFindAssetContext();

    if (isFetching) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                <AssetSkeleton />
                <AssetSkeleton />
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