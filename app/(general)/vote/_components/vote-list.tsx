"use client"

import React, { useState } from 'react'
import VoteItem from './vote-item';
import { useGetLandlordInfo } from '@/hooks/query';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const VoteList = () => {

    const { landlordsData, isFetching } = useGetLandlordInfo();

    if (isFetching) {
        return (
            <div className="grid grid-cols-4">
                <div className='flex flex-col gap-4 col-start-2 col-span-2'>
                    <Skeleton className='w-full aspect-video bg-border dark:bg-oupia-sub' />
                    <Skeleton className='w-full aspect-video bg-border dark:bg-oupia-sub' />
                    <Skeleton className='w-full aspect-video bg-border dark:bg-oupia-sub' />
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-4">
            <div className='flex flex-col gap-4 col-start-2 col-span-2'>
                {
                    !!landlordsData?.length && landlordsData?.map((info: any) => {
                        return <>
                            <VoteItem key={info.id} data={info} />
                            <Separator />
                        </>
                    })
                }
            </div>
        </div>
    )
}

export default VoteList;