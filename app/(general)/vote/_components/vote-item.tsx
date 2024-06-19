import React from 'react'
import VoteDialog from './vote-dialog'

const VoteItem = () => {
    return (
        <div className='py-4 px-6 border rounded-lg flex flex-col gap-2 bg-background shadow-md dark:bg-oupia-base'>
            VoteItem
            <VoteDialog />
        </div >
    )
}

export default VoteItem