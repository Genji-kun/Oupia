"use client"

import React from 'react';
import { AssetDetailProvider } from '@/contexts/asset-detail-context';
import AssetDetail from './_components/asset-detail';
import AssetImageSection from './_components/asset-image-section';
import AssetReviews from './_components/asset-reviews';

const AssetDetailPage = () => {

    return (
        <AssetDetailProvider>
            <div className="h-full w-full bg-background">
                <div className="container relative h-full w-full flex flex-col gap-6 pt-0 lg:pt-10 py-10">
                    <AssetImageSection />
                    <div className="grid grid-cols-3 gap-6 px-4 lg:px-0 min-h-screen">
                        <div className="col-span-3 xl:col-span-2">
                            <AssetDetail />
                        </div>
                        <div className="hidden xl:flex flex-col ">
                            <div className="sticky h-[calc(100vh - 80px) top-[calc(80px + 1.5rem)]] flex flex-col gap-4">
                                {/* <AssetOwner user={asset.user} /> */}
                                <AssetReviews />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AssetDetailProvider>
    );
};

export default AssetDetailPage;