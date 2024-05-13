"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ReviewResponse } from '@/interfaces/Review';
import { cn } from '@/lib/utils';
import { convert } from '@/utils/convertAvatarAlt';
import { Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function ReviewItem({ review }: { review: ReviewResponse }) {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-2">
                <Link href={`/profile/${review.username}`}>
                    <Avatar className='w-12 h-12'>
                        <AvatarImage src={review.avatar} alt={"User Avatar"} />
                        <AvatarFallback>{review.fullName && convert(review.fullName)}</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="flex items-center justify-center">
                    <h3 className="mr-0.5">{review.star}</h3>
                    <Star className="w-3 h-3 fill-yellow-300 stroke-yellow-300" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                    <h3 className="font-semibold">{review.fullName}</h3>
                    <span><span className='text-muted-foreground'>- Độ tương đồng: </span><span className={cn("font-semibold", review.score > 0.7 ? "text-green-600" : (review.score > 0.5) ? "text-yellow-600" : "text-red-600")}>{Math.round(review.score * 100)}%</span></span>
                </div>
                <p className="bg-border dark:bg-oupia-sub rounded py-2 px-3 w-fit">{review.content}</p>
            </div>
        </div>
    )
}

export default ReviewItem;
