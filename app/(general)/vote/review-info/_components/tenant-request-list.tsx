"use client"

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTenantRequestList } from '@/hooks/query'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react'

const TenantRequestItem = dynamic(() => import("./tenant-request-item"), {
    ssr: false
})

const TenantRequestList = () => {

    const { tenantReqData, isFetching } = useGetTenantRequestList();

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
                !!tenantReqData?.length ? tenantReqData?.map((info: any) => {
                    return <React.Fragment key={info.id}>
                        <TenantRequestItem data={info} />
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

export default TenantRequestList