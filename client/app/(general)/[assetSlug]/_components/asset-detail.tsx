"use client"

import { Separator } from '@/components/ui/separator';
import { numberToCurrency } from '@/utils/priceConvert';
import React from 'react';
import MapRoute from './map-route';
import { useAssetDetailContext } from '@/contexts/asset-detail-context';
import { format } from 'date-fns';
import { Calendar, UsersRoundIcon } from 'lucide-react';
import { BiArea } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import { TbLocationSearch } from 'react-icons/tb';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const AssetDetail = () => {

    const { asset, isFetching } = useAssetDetailContext();

    if (!asset) {
        return <></>
    }

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div>
                <h2 className="text-sm lg:text-normal uppercase font-normal text-muted-foreground mb-3">{asset.fullLocation}</h2>
                <h1 className="font-montserrat font-bold text-xl lg:text-2xl">{asset.assetName}</h1>
                <div className="flex gap-2 items-center">
                    <div className="flex gap-1 items-center pr-2 border-r-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <h3><span className="text-muted-foreground">Ngày đăng: </span>{format(asset.createdAt, "dd-MM-yyyy")} </h3>
                    </div>
                    <div className="flex gap-1 items-center">
                        <BiArea className="w-4.5 h-4.5 text-muted-foreground" />
                        <h3>{asset.area}m²</h3>
                    </div>
                    <div className="flex gap-1 items-center">
                        <UsersRoundIcon className="w-4 h-4 text-muted-foreground" />
                        <h3> &#8804; {asset.maxPeople} người</h3>
                    </div>
                </div>
                <h3 className="lg:text-xl text-primary-500 font-semibold mt-3">{asset.price && numberToCurrency(asset.price)}</h3>
            </div>
            <div>

                <p className="dark:text-muted-foreground">
                    {asset.assetDescription.split('\n').map((line: string, index: number) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </p>
            </div>

            <Separator />
            <div className="flex justify-between items-center">
                <h1 className="font-montserrat font-bold text-xl lg:text-3xl">Địa điểm</h1>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={"ghost"} className="w-fit h-fit p-3 rounded-full">
                                <TbLocationSearch className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent align='center'>
                            <p>Tìm đường đi đến căn hộ</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-muted-foreground text-base">{asset.fullLocation}</h3>
                <MapRoute />
            </div>
        </div>
    );
};

export default AssetDetail;