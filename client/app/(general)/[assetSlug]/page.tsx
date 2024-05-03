"use client"

import React from 'react';
import { AssetDetailProvider } from '@/contexts/asset-detail-context';
import AssetDetail from './_components/asset-detail';
import AssetImageSection from './_components/asset-image-section';

const AssetDetailPage = () => {

    return (
        <AssetDetailProvider>
            <div className="container relative h-full w-full flex flex-col gap-6 pt-0 lg:pt-10 py-10">
                <AssetImageSection />
                <div className="grid grid-cols-3 gap-6 px-4 lg:px-0 min-h-screen">
                    <div className="col-span-3 xl:col-span-2">
                        <AssetDetail />
                    </div>
                    <div className="hidden xl:flex flex-col ">
                        <div className="sticky asset-owner">
                            {/* <AssetOwner user={asset.user} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </AssetDetailProvider>
    );
};

export default AssetDetailPage;