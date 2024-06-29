import React from 'react'
import dynamic from 'next/dynamic';

const TenantRequestList = dynamic(() => import('./_components/tenant-request-list'), {
    ssr: false
});

const VoteReviewInfoPage = () => {
    return (
        <TenantRequestList />
    )
}

export default VoteReviewInfoPage;