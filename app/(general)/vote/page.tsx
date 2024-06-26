import { Metadata } from 'next';
import dynamic from 'next/dynamic'
import React from 'react'

export const metadata: Metadata = {
    title: "Xác thực chủ nhà trọ"
}

const VoteList = dynamic(() => import('./_components/vote-list'), {
    ssr: false
});


const VotingPage = () => {
    return (
        <VoteList />
    )
}

export default VotingPage;