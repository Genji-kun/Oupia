"use client"

import { Separator } from '@/components/ui/separator'
import React from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import UserReputationInfo from './user-reputation-info'
import GetReputationPointSection from './get-reputation-point-section'
import { useSelector } from 'react-redux'

const ReputationCard = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    if (currentUser)
        return (
            <div className="lg:w-3/5 px-8 py-6 mx-auto rounded flex flex-col gap-4 border border-border shadow-md shadow-dark-theme">
                <div className='space-y-1'>
                    <h3 className='text-lg uppercase font-semibold '>Hệ thống điểm tiếng tăm</h3>
                    <div className='flex items-center gap-1.5'>
                        <BsQuestionCircle className='w-3.5 h-3.5 text-muted-foreground' />
                        <p className='text-sm text-muted-foreground'>Điểm tiếng tăm trong hệ thống có thể ảnh hưởng đến hệ số điểm xác thực thông tin.</p>
                    </div>
                </div>
                <Separator />
                <UserReputationInfo user={currentUser} />
                <Separator />
                <GetReputationPointSection user={currentUser} />
            </div>

        )
}

export default ReputationCard