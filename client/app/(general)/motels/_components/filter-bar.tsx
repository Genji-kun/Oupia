"use client"

import { Separator } from '@/components/ui/separator';
import BathBedRooms from './bath-bed-rooms';
import MaxMinPrice from './max-min-price';
import AssetTypeSelector from './asset-type-selector';
import { Button } from '@/components/ui/button';
import { Map, Search } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const FilterBar = () => {


    return (
        <div className="flex flex-col gap-y-4 p-8 border-r border-border w-96 h-screen shadow overflow-y-auto scrollbar-thin">
            <div className="flex items-center">
                <h1 className="font-bold text-2xl">Bộ lọc tìm kiếm</h1>
                <div className="flex gap-x ml-auto items-center">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant={"ghost"} className="ml-auto px-2 text-gray-600 dark:text-gray-400 rounded-full">
                                    <Map className=" w-6 h-6" />
                                </Button></TooltipTrigger>
                            <TooltipContent>
                                <p>Tìm trên bản đồ</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip >
                            <TooltipTrigger asChild>
                                <Button onClick={() => { }} variant={"ghost"} className="ml-auto px-2 text-gray-600 dark:text-gray-400 rounded-full">
                                    <Search className=" w-6 h-6" />
                                </Button></TooltipTrigger>
                            <TooltipContent>
                                <p>Ẩn / Hiện ô tìm kiếm</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <span className="text-gray-600 dark:text-gray-500">126 kết quả</span>
            <Separator className="h-[2px]" />
            <AssetTypeSelector />
            <Separator className="h-[2px]" />
            <MaxMinPrice />
            <Separator className="h-[2px]" />
            <BathBedRooms />
        </div >
    );
};

export default FilterBar;