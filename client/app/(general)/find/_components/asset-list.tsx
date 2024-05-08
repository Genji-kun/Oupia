"use client"

import React from 'react';
import AssetItem from './asset-item';
import AssetSkeleton from './asset-skeleton';
import { useFindAssetContext } from '@/contexts/find-asset-context';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchXIcon } from 'lucide-react';

const AssetList = () => {
    const { assets, isFetching } = useFindAssetContext();

    if (isFetching) {
        return (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-4">
                    <AssetSkeleton />
                    <AssetSkeleton />
                    <AssetSkeleton />
                    <AssetSkeleton />
                    <AssetSkeleton />
                    <AssetSkeleton />
                    <AssetSkeleton />
                    <AssetSkeleton />
                </div>
                <Skeleton className=" w-1/2 mx-auto h-10 dark:bg-oupia-sub" />
            </>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 flex-grow">
            <>
                {assets && assets.length > 0 ? assets.map((asset: any, index: number) => {
                    return <React.Fragment key={index}>
                        <AssetItem asset={asset} />
                    </React.Fragment>
                }) : 
                    <div className="sm:col-span-2 xl:col-span-3 2xl:col-span-4 flex flex-col gap-4 items-center justify-center h-[calc(100vh-96px)] w-full text-muted-foreground">
                        <SearchXIcon className="w-24 h-24"/>
                        <h2 className="text-2xl font-semibold ">Không tìm thấy kết quả nào, hãy thử lại.</h2>
                    </div>
                }
            </>
        </div>
    );
};

export default AssetList;