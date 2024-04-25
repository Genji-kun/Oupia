import React from 'react';
import AssetDetailContainer from './_components/asset-detail-container';

const AssetDetailPage = () => {

    return (
        <div className="container relative h-full w-full flex flex-col gap-6 pt-0 lg:pt-10 py-10">
            <AssetDetailContainer />
        </div>
    );
};

export default AssetDetailPage;