import React from 'react'
import AssetSkeleton from './_components/asset-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
    return (
        <div className="w-full p-4">
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
            <Skeleton className="w-1/2 mx-auto h-10 dark:bg-oupia-sub" />
        </div>
    )
}

export default Loading;
