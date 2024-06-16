import React from 'react'
import VoteItem from './vote-item';

const VoteList = () => {
    return (
        <div className="grid grid-cols-4">
            <div className='flex flex-col gap-3 col-start-2 col-span-2'>
                <VoteItem />
                <VoteItem />
                <VoteItem />
                <VoteItem />
                <VoteItem />
            </div>
        </div>

    )
}

export default VoteList;