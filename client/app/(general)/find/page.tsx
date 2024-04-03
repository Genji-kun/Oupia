import React from 'react';
import FilterBar from './_components/filter-bar';
import AssetContainer from './_components/asset-container';
import { Metadata } from 'next';
import { FindAssetProvider } from '@/contexts/find-asset-context';

export const metadata: Metadata = {
    title: 'Oupia | Tìm thuê nơi ở',
    description: '',
}

const MotelsPage = () => {
    return (
        <FindAssetProvider>
            <div className="xl:h-screen bg-background hidden xl:block fixed left-0 z-100">
                <FilterBar />
            </div>
            <div className="flex h-full w-full">
                <div className="xl:min-w-96 hidden xl:block"></div>
                <div className="flex-auto">
                    <AssetContainer />
                </div>
            </div>
        </FindAssetProvider>
    );
};

export default MotelsPage;