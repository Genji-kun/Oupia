import React from 'react';
import FilterBar from './_components/filter-bar';
import { ToggleProvider } from '@/contexts/toggle-search-context';
import AssetContainer from './_components/asset-container';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Oupia | Tìm thuê nơi ở',
    description: '',
}

const MotelsPage = () => {
    return (
        <>
            <div>
                <ToggleProvider>
                    <div className="h-screen bg-background hidden xl:block fixed left-0 z-100">
                        <FilterBar />
                    </div>
                    <div className="flex h-full w-full">
                        <div className="min-w-96 hidden xl:block"></div>
                        <div className="flex-auto">
                            <AssetContainer />
                        </div>
                    </div>
                </ToggleProvider>
            </div>
        </>

    );
};

export default MotelsPage;