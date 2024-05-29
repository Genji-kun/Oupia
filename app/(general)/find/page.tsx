import React from 'react';
import AssetContainer from './_components/asset-container';

const FindAssetsPage = () => {
    return (
        <div className="flex-auto">
            <div className=" w-full h-full">
                <div className="flex flex-col gap-4 w-full h-full">
                    <AssetContainer />
                </div>
            </div>
        </div>
    );
};

export default FindAssetsPage;
