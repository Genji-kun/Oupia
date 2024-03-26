"use client"

import React, { useState } from 'react';
import { Button } from '../button';
import { Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../dialog';
import { ScrollArea } from '../scroll-area';

const SearchButton = () => {

    const [results, setResults] = useState<any[]>([]);
    const [histories, setHistories] = useState<string[]>();

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"} className="dark:bg-oupia-sub px-2.5 dark:border-none justify-between items-center xl:text-muted-foreground xl:w-80 xl:px-4 hover:shadow shadow-black/50">
                        <span className="hidden xl:block">Tìm kiếm nơi thuê...</span>
                        <Search size={20}></Search>
                    </Button>
                </DialogTrigger>
                <DialogContent className=" p-0 top-[40%] h-fit">
                    <DialogHeader className="border-b border-border">
                        <div className="w-full grid grid-cols-12">
                            <div className="absolute top-4 left-4 flex items-center justify-center">
                                <Search className="h-4 w-4" />
                            </div>
                            <input
                                className="enabled:focus:ring-0 enabled:focus:outline-none border-none col-span-10 px-0 py-3 bg-background"
                                placeholder='Tìm kiếm địa điểm, dự án cụ thể bạn muốn thuê...' />
                        </div>
                    </DialogHeader>
                    {
                        results.length === 0 ?
                            <ScrollArea className="h-72 w-full">
                                <div className="text-sm">
                                    <h1 className="text-muted-foreground font-semibold px-5">Tìm kiếm gần đây</h1>
                                    <div className="flex flex-col w-full gap-1">

                                    </div>
                                </div>
                            </ScrollArea> : <div className="p-5 pt-0 flex flex-col justify-center">
                                <span className="text-center">Không tìm thấy kiếm quả.</span>
                            </div>
                    }
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default SearchButton;