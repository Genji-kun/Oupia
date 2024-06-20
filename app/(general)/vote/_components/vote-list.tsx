"use client"

import React, { useState } from 'react'
import VoteItem from './vote-item';
import { useGetLandlordInfo } from '@/hooks/query';
import { Separator } from '@/components/ui/separator';
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_SITE_KEY } from '@/lib/constants/SettingSystem';



const VoteList = () => {

    const { landlordsData, isFetching } = useGetLandlordInfo();
    const [isVerified, setIsVerified] = useState<boolean>(false);


    return (
        <div className="grid grid-cols-4">
            <div className='flex flex-col gap-4 col-start-2 col-span-2'>
                {
                    !!landlordsData?.length && landlordsData?.map((info: any) => {
                        return <>
                            <VoteItem key={info.id} data={info} isVerified={isVerified} />
                            <Separator />
                        </>
                    })
                }
            </div>
            <div className='flex flex-col gap-2 items-center pt-11 h-[calc(100vh-80px)] sticky top-[60px]'>
                <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY!} onChange={(token) => setIsVerified(!!token)} />
                {!isVerified && <h2 className='w-1/2 text-center'>Hãy xác minh để đánh giá và xem thông tin</h2>}
            </div>
        </div>

    )
}

export default VoteList;