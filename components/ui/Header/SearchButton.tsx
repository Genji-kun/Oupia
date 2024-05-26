"use client"

import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { Clock, Loader2, Router, Search, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../dialog';
import { ScrollArea } from '../scroll-area';
import { useDispatch, useSelector } from 'react-redux';
import { Separator } from '../separator';
import { publicApi } from '@/configs/axiosInstance';
import { assetsEndpoints } from '@/configs/axiosEndpoints';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { AssetResponse } from '@/lib/types/interfaces/Asset';
import { History, addHistory, removeHistory } from '@/redux/slices/searchHistorySlice';
import { useRouter } from 'next/navigation';

const fetchAssets = async (searchQuery: string) => {
    try {
        const res = await publicApi.get(assetsEndpoints["assets"], {
            params: {
                keyword: searchQuery,
            }
        })
        if (res.status === 200) {
            return res.data.content;
        }
    } catch (error) {
        console.error(error);
    }
};

const SearchButton: React.FC = () => {

    const { searchHistories } = useSelector((state: any) => state.searchHistorySlice);
    const dispatch = useDispatch();
    const router = useRouter();

    const [query, setQuery] = useState<string>("");

    const [debouncedQuery] = useDebounce(query, 2000);

    const { data: results, isLoading, refetch } = useQuery({
        queryKey: ["searchAssets", query],
        queryFn: () => fetchAssets(debouncedQuery),
        enabled: false,
    });

    useEffect(() => {
        if (debouncedQuery) {
            refetch();
        }
    }, [debouncedQuery, refetch]);

    return (
        <div>
            <Dialog onOpenChange={() => setQuery("")}>
                <DialogTrigger asChild>
                    <div>
                        <Button variant={"outline"} className="dark:bg-oupia-sub px-2.5 dark:border-none justify-between items-center xl:text-muted-foreground xl:w-80 xl:px-4 hover:shadow shadow-black/50">
                            <span className="hidden xl:block">Tìm kiếm nơi thuê...</span>
                            <Search size={20}></Search>
                        </Button>
                    </div>
                </DialogTrigger>
                <DialogContent className=" p-0 top-[40%] h-fit">
                    <DialogHeader className="border-b border-border">
                        <div className="w-full grid grid-cols-12">
                            <div className="absolute top-4 left-4 flex items-center justify-center">
                                <Search className="h-4 w-4" />
                            </div>
                            <input
                                value={query}
                                onChange={(evt) => { setQuery(evt.target.value) }}
                                className="enabled:focus:ring-0 enabled:focus:outline-none border-none col-span-11 pl-11 py-3 bg-background"
                                placeholder='Tìm kiếm địa điểm, dự án cụ thể bạn muốn thuê...' />
                        </div>
                    </DialogHeader>
                    {/* <ScrollArea className="h-72 w-full">
                        <>
                            {searchHistories.length > 0 &&
                                <>
                                    <div className="text-sm">
                                        <h1 className="text-muted-foreground font-semibold px-5 pb-3">Tìm kiếm gần đây</h1>
                                        <div className="flex flex-col w-full">
                                            {
                                                searchHistories.map((history: History, index: number) => {
                                                    return <React.Fragment key={index}>
                                                        <div
                                                            onClick={() => {
                                                                router.push(`/${history.assetSlug}`)
                                                            }}
                                                            className="w-full flex items-center justify-between py-2 px-4 cursor-pointer dark:hover:bg-oupia-sub/50">
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                                                <span className="line-clamp-1 max-w-[3/4]">{history.result}</span>
                                                            </div>
                                                            <Button onClick={() => dispatch(removeHistory(history))} className="w-fit h-fit p-2 rounded-full" variant={"ghost"}>
                                                                <X className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </React.Fragment>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <Separator className="my-2" />
                                </>
                            }
                            {isLoading && <Loader2 className="text-primary animate-spin mx-auto"></Loader2>}
                            {
                                results &&
                                (
                                    results.length > 0 ?
                                        <div className="text-sm">
                                            <h1 className="text-muted-foreground font-semibold px-5 pb-3">Kết quả tìm kiếm</h1>
                                            <div className="flex flex-col w-full">
                                                {
                                                    results.map((asset: AssetResponse, index: number) => {
                                                        return <React.Fragment key={index}>
                                                            <div
                                                                onClick={
                                                                    () => {
                                                                        router.push(`/${asset.assetSlug}`)
                                                                        dispatch(addHistory(
                                                                            {
                                                                                assetSlug: asset.assetSlug,
                                                                                result: asset.assetName
                                                                            }
                                                                        ));
                                                                    }} className="w-full py-3 px-4 cursor-pointer dark:hover:bg-oupia-sub">
                                                                <span className="line-clamp-1 max-w-[4/5]">{asset.assetName}</span>
                                                            </div>
                                                        </React.Fragment>
                                                    })
                                                }
                                            </div>
                                        </div>
                                        : <div className="p-5 pt-0 flex flex-col justify-center">
                                            <span className="text-center">Không tìm thấy kiếm quả.</span>
                                        </div>
                                )
                            }
                        </>
                    </ScrollArea> */}
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default SearchButton;