import { Separator } from '@/components/ui/separator';
import { Asset } from '@/interfaces/Asset';
import { numberToCurrency } from '@/utils/priceConvert';
import React from 'react';

const AssetDetail = ({ asset }: { asset: Asset }) => {
    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div>
                <h2 className="uppercase font-normal text-gray-600 dark:text-gray-400 mb-3">{asset.location}</h2>
                <h1 className="font-montserrat font-bold text-3xl">{asset.name}</h1>
                <h3 className="text-xl text-primary-500 font-semibold">{asset.price && numberToCurrency(asset.price)}</h3>
            </div>
            <div>
                <p className="dark:text-gray-400">{asset.description}</p>
            </div>
            <Separator />
        </div>
    );
};

export default AssetDetail;