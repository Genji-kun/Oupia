"use client";


import React from 'react';
import { useFindAssetContext } from '@/contexts/find-asset-context';
import AssetPagination from './asset-pagination';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('./map-container'), {
    ssr: false
});

const AssetList = dynamic(() => import('./asset-list'), {
    ssr: false
});

const AssetContainer = () => {

    const { openMap } = useFindAssetContext();

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            {openMap ?
                <MapContainer />
                :
                <div className="px-4 w-full flex-grow space-y-2">
                    <AssetList />
                    <AssetPagination />
                </div>
            }
        </div>
    );
};

export default AssetContainer;