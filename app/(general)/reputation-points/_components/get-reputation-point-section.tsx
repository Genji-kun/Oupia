import React from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import GoogleVerifySection from './google-verify-section'
import { ICurrentUser } from '@/lib/interfaces/response/User'
import FacebookVerifySection from './facebook-verify-section'
import TenantVoteSection from './tennant-vote-section'
import LandlordInfoSection from './landlord-info-vote-section'

const GetReputationPointSection = ({ user }: { user: ICurrentUser }) => {
    return (
        <>
            <div className='space-y-1'>
                <h3 className='text-lg uppercase font-semibold '>Thu thập, tích lũy điểm tiếng tăm</h3>
                <div className='flex items-center gap-1.5'>
                    <BsQuestionCircle className='w-3.5 h-3.5 text-muted-foreground' />
                    <p className='text-sm text-muted-foreground'>Dựa vào các phương thức sau bạn có thể tích lũy thêm điẻm.</p>
                </div>
            </div>
            <div className='space-y-6'>
                <GoogleVerifySection user={user} />
                <FacebookVerifySection user={user} />
                <TenantVoteSection />
                <LandlordInfoSection />
            </div>
        </>
    )
}

export default GetReputationPointSection