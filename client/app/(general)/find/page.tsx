import React from 'react';
import FilterBar from './_components/filter-bar';
import AssetContainer from './_components/asset-container';
import { Metadata } from 'next';
import { FindAssetProvider } from '@/contexts/find-asset-context';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
    title: 'Tìm thuê căn hộ | Oupia',
    description: '',
}

const FindAssetsPage = () => {
    return (
        <FindAssetProvider>
            <div className="xl:h-screen bg-background hidden xl:block fixed left-0 z-100">
                <FilterBar />
            </div>
            <div className="flex min-h-[calc(100vh-80px)] w-full">
                <div className="xl:min-w-96 hidden xl:block"></div>
                <div className="flex-auto">
                    <AssetContainer />
                </div>
            </div>
        </FindAssetProvider>
    );
};

export default dynamic(() => Promise.resolve(FindAssetsPage), { ssr: false })
