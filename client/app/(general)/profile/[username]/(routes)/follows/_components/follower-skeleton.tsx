import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function FollowerSkeleton() {
    return (
        <div className='flex gap-5 items-center p-2'>
            <Skeleton className="w-36 aspect-square rounded-lg bg-border dark:bg-oupia-sub" />
            <div className="space-y-4 flex-grow">
                <Skeleton className="w-full h-8 rounded-full bg-border dark:bg-oupia-sub" />
                <Skeleton className="w-1/3 h-5 rounded-full bg-border dark:bg-oupia-sub" />
            </div>
        </div>
    )
}

export default FollowerSkeleton