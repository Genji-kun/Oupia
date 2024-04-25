import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function AssetSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="aspect-[10/9] w-full bg-border dark:bg-oupia-sub" />
      <Skeleton className="rounded-full h-4 w-full bg-border dark:bg-oupia-sub" />
      <Skeleton className="rounded-full h-4 w-1/3 bg-border dark:bg-oupia-sub" />
    </div>
  )
}

export default AssetSkeleton
