"use client"

import { Separator } from '@/components/ui/separator';
import MaxMinPrice from './max-min-price';
import { Button } from '@/components/ui/button';
import { Map, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFindAssetContext } from '@/contexts/find-asset-context';
import LocationFilter from './location-filter';
import { Input } from '@/components/ui/input';
import MaxPeopleSection from './max-people-section';

const FilterBar = () => {

    const { openMap, setOpenMap, assets, keyword, setKeyword } = useFindAssetContext();


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
                                </TooltipProvider>
                            </>}
                    </div>
                </div>
                <span className="text-muted-foreground">{assets ? assets.length : "0"} kết quả</span>
            </div>
            <Separator className="h-[2px]" />
            {openMap ?
                <>
                    <LocationFilter />
                </>
                :
                <>
                    <div className="flex flex-col gap-y-2">
                        <h2 className="font-semibold text-lg">Từ khóa</h2>
                        <Input value={keyword} onChange={(evt) => setKeyword(evt.target.value)} placeholder='Nhập từ khóa tìm kiếm...' />
                    </div>
                    <Separator className="h-[2px]" />
                    <MaxMinPrice />
                    <Separator className="h-[2px]" />
                    <MaxPeopleSection />
                </>}
        </div >
    );
};

export default FilterBar;