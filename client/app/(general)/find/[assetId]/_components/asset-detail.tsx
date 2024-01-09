import { Separator } from '@/components/ui/separator';
import { Asset } from '@/interfaces/Asset';
import { numberToCurrency } from '@/utils/priceConvert';
import React from 'react';
import MapRoute from './map-route';

const AssetDetail = ({ asset }: { asset: Asset }) => {
    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div>
                <h2 className="text-sm lg:text-normal uppercase font-normal text-gray-600 dark:text-gray-400 mb-1 lg:mb-3">{asset.location}</h2>
                <h1 className="font-montserrat font-bold text-xl lg:text-3xl">{asset.name}</h1>
                <h3 className="lg:text-xl text-primary-500 font-semibold">{asset.price && numberToCurrency(asset.price)}</h3>
            </div>
            <div>
                <p className="dark:text-gray-400">{asset.description}</p>
            </div>
            <Separator />
            <div>
                <h1 className="font-montserrat font-bold text-xl lg:text-3xl">Thông tin chính</h1>
            </div>
            <Separator />
            <h1 className="font-montserrat font-bold text-xl lg:text-3xl">Địa điểm và tiện ích xung quanh</h1>
            <div>
                <MapRoute />
            </div>
        </div>
    );
};

export default AssetDetail;