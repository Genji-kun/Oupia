import { useUploadContext } from '@/contexts/upload-context'
import React from 'react'
import PostItemReview from './post-item-review';
import { Separator } from '@/components/ui/separator';

function PostView() {

    const { post } = useUploadContext();

    return (
        <div className="flex flex-col gap-6 items-center justify-center w-full h-full pb-4">
            <PostItemReview post={post} />
            <div className="border shadow bg-background dark:bg-oupia-base rounded-lg shadow-dark-theme w-4/5 2xl:w-1/2">
                <div className="flex gap-2 items-start p-4 pb-0">
                    <div className="bg-border dark:bg-oupia-sub min-w-12 aspect-square animate-pulse rounded-full"></div>
                    <div className="space-y-2 w-32">
                        <div className="bg-border dark:bg-oupia-sub p-2 animate-pulse rounded-full"></div>
                        <div className="bg-border dark:bg-oupia-sub p-1.5 w-1/2 animate-pulse rounded-full"></div>
                    </div>
                </div>
                <div className="p-4 space-y-2">
                    <div className="bg-border dark:bg-oupia-sub p-2 w-full animate-pulse rounded-full"></div>
                    <div className="bg-border dark:bg-oupia-sub p-2 w-1/2 animate-pulse rounded-full"></div>
                    <div className="bg-border dark:bg-oupia-sub p-2 w-3/4 animate-pulse rounded-full"></div>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-1 p-4">
                        <div className="bg-border dark:bg-oupia-sub py-4 px-12 animate-pulse rounded"></div>
                        <div className="bg-border dark:bg-oupia-sub py-4 px-12 animate-pulse rounded"></div>
                    </div>
                    <div className="flex gap-1 p-4">
                        <div className="bg-border dark:bg-oupia-sub py-4 px-8 animate-pulse rounded"></div>
                        <div className="bg-border dark:bg-oupia-sub py-4 px-10 animate-pulse rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostView