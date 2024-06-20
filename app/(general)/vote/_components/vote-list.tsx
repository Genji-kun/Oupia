"use client"

import React from 'react'
import VoteItem from './vote-item';
import { useGetLandlordInfo } from '@/hooks/query';

const VoteList = () => {

    const { landlordsData, isFetching } = useGetLandlordInfo();

    return (
        <div className="grid grid-cols-4">
            <div className='flex flex-col gap-3 col-start-2 col-span-2'>
                {
                    !!landlordsData?.length && landlordsData?.map((info: any) => {
                        return <VoteItem key={info.id} data={info} />
                    })
                }
            </div>
        </div>

    )
}

export default VoteList;