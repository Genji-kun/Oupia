"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ReviewResponse } from '@/interfaces/Review';
import { convert } from '@/utils/convertAvatarAlt';
import { Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function ReviewItem({ review }: { review: ReviewResponse }) {
    return (
        <div className="flex gap-4">
            <Link href={`/profile/${review.username}`}>
                <Avatar className='w-12 h-12'>
                    <AvatarImage src={review.avatar} alt={"User Avatar"} />
                    <AvatarFallback>{review.fullName && convert(review.fullName)}</AvatarFallback>
                </Avatar>
            </Link>
            <div className="flex flex-col gap-2">
                <div className="flex items-center">
                    <h3 className="font-semibold">{review.fullName}</h3>
                    <h3 className="ml-2 mr-0.5">{review.star}</h3>
                    <Star className="w-3 h-3 fill-yellow-300 stroke-yellow-300"/>
                </div>
                <p className="bg-border dark:bg-oupia-sub rounded py-2 px-3 w-fit">{review.content}</p>
            </div>
        </div>
    )
}

export default ReviewItem;
