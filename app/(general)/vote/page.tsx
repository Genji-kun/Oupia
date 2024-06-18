import { Metadata } from 'next';
import dynamic from 'next/dynamic'
import React from 'react'

const VoteList = dynamic(() => import('./_components/vote-list'), {
    ssr: false
});

export const metadata: Metadata = {
    title: "Đánh giá thông tin"
}

const VotingPage = () => {
    return (
        <div className="container py-4">
            <VoteList />    
        </div>
    )
}

export default VotingPage;