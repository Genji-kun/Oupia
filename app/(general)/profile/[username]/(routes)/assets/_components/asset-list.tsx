"use client"

import AssetSkeleton from '@/app/(general)/find/_components/asset-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { assetsEndpoints } from '@/configs/axiosEndpoints';
import { publicApi } from '@/configs/axiosInstance';
import { useProfileContext } from '@/contexts/profile-context';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import AssetItem from './asset-item';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

function AssetList() {

    const { userInfoData } = useProfileContext();

    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const getAssetsData = async ({ queryKey }: any) => {
        const [_key, { userInfoData }] = queryKey;
        try {
            const res = await publicApi.get(assetsEndpoints["assets"], {
                params: {
                    size: 4,
                    page: currentPage,
                    userId: userInfoData?.id
                }
            })
            if (res.data.totalPages > 0)
                setTotalPages(res.data.totalPages);
            else
                setTotalPages(1);
            return res.data.content;
        } catch (error) {
            console.error(error);
        }
    }

    const { data: assets, isFetching } = useQuery({
        queryKey: ["searchAssetByProfile", { userInfoData, currentPage }],
        queryFn: getAssetsData,
        refetchOnWindowFocus: false,
    })

    if (isFetching) {
        return (
            <>
                <div className='flex flex-col gap-4 container'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ">
                        <AssetSkeleton />
                        <AssetSkeleton />
                        <AssetSkeleton />
                        <AssetSkeleton />
                    </div>
                    <Skeleton className=" w-1/2 mx-auto h-10 dark:bg-oupia-sub" />
                </div>

            </>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-4">
            <>
                {
                    assets && assets.length > 0 && assets.map((asset: any, index: number) => {
                        return <React.Fragment key={index}>
                            <AssetItem asset={asset} />
                        </React.Fragment>
                    })
                }
                {

                    !isFetching && assets && assets.length > 0 && <div className="w-full col-span-1 sm:col-span-2 xl:col-span-3 2xl:col-span-4 gap-x-4 flex items-center justify-center">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                className="h-8 w-fit px-4 py-5 flex gap-2"
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                disabled={currentPage <= 1}>
                                <ChevronLeftIcon className="h-4 w-4" />
                                <span>Trang trước</span>
                            </Button>

                            <Button
                                variant="outline"
                                className="h-8 w-fit px-4 py-5 flex gap-2"
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                disabled={currentPage >= totalPages}>
                                <span>Trang sau</span>
                                <ChevronRightIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                }
            </>
        </div>
    )
}

export default AssetList;
