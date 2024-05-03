import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function UserSkeleton() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="bg-border dark:bg-oupia-sub object-cover w-16 aspect-square rounded-full" />
            <div className="space-y-1 hidden xl:block">
                <Skeleton className={`bg-border dark:bg-oupia-sub h-4 w-[250px]`} />
            </div>
        </div>
    )
}

export default UserSkeleton