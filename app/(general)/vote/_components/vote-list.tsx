"use client"

import React from 'react'
import VoteItem from './vote-item';
import { useGetLandlordInfo } from '@/hooks/query';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const VoteList = () => {

    const { landlordsData, isFetching } = useGetLandlordInfo();

    if (isFetching) {
        return (
            <div className='flex flex-col gap-4 col-start-2 col-span-2'>
                <Skeleton className='w-full aspect-video bg-border dark:bg-oupia-sub' />
                <Skeleton className='w-full aspect-video bg-border dark:bg-oupia-sub' />
                <Skeleton className='w-full aspect-video bg-border dark:bg-oupia-sub' />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-4 col-start-2 col-span-2'>
            {
                !!landlordsData?.length ? landlordsData?.map((info: any) => {
                    return <React.Fragment key={info.id}>
                        <VoteItem data={info} />
                        <Separator />
                    </React.Fragment>
                }) : <div className='text-center my-10 text-xl flex flex-col gap-4'>
                    <p>Hiện tại không có thông tin cần xác nhận.</p>
                    <Link href="/">
                        <Button className='styled-button w-fit mx-auto'>Quay về trang chủ</Button>
                    </Link>
                </div>
            }
        </div>
    )
}

export default VoteList;