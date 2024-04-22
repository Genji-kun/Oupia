"use client"

import { Separator } from '@/components/ui/separator';
import BathBedRooms from './bath-bed-rooms';
import MaxMinPrice from './max-min-price';
import AssetTypeSelector from './asset-type-selector';
import { Button } from '@/components/ui/button';
import { Map, Search, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFindAssetContext } from '@/contexts/find-asset-context';
import LocationFilter from './location-filter';

const FilterBar = () => {

    const { openSearch, setOpenSearch, openMap, setOpenMap } = useFindAssetContext();

    return (
        <div className="flex flex-col gap-y-4 p-6 border-r border-border w-96 h-screen overflow-y-auto dark:bg-oupia-base">
            <div>
                <div className="flex items-center justify-between">
                    <h1 className="font-bold text-2xl">Bộ lọc tìm kiếm</h1>
                    <div className="flex gap-[1px] items-center">
                        {openMap ?
                            <>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button onClick={() => { setOpenMap(false) }} variant={"ghost"} className="ml-auto w-fit h-fit p-2 rounded-full">
                                                <X className="w-5 h-5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side='bottom' align='end'>
                                            <p>Đóng bản đồ</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </> :
                            <>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button onClick={() => { setOpenMap(true) }} variant={"ghost"} className="ml-auto w-fit h-fit p-2 rounded-full">
                                                <Map className="w-5 h-5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side='bottom'>
                                            <p>Tìm trên bản đồ</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip >
                                        <TooltipTrigger asChild>
                                            <Button onClick={() => { setOpenSearch(!openSearch) }} variant={"ghost"} className="ml-auto w-fit h-fit p-2 rounded-full">
                                                <Search className="w-5 h-5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side='bottom' align='end'>
                                            <p>Ẩn / Hiện ô tìm kiếm</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </>}
                    </div>
                </div>
                <span className="text-gray-600 dark:text-gray-400">126 kết quả</span>
            </div>
            <Separator className="h-[2px]" />
            {openMap ?
                <>
                    <LocationFilter />
                </>
                :
                <>
                    <AssetTypeSelector />
                    <Separator className="h-[2px]" />
                    <MaxMinPrice />
                    <Separator className="h-[2px]" />
                    <BathBedRooms />
                </>}
        </div >
    );
};

export default FilterBar;