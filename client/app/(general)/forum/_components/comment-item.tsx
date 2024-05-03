"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommentResponse } from '@/interfaces/Comment';
import { convert } from '@/utils/convertAvatarAlt';
import Link from 'next/link';
import React from 'react'

function CommentItem({ comment }: { comment: CommentResponse }) {
    return (
        <div className="flex gap-2">
            <Link href={`/profile/${comment.username}`}>
                <Avatar className='w-12 h-12'>
                    <AvatarImage src={comment.avatar} alt={"User Avatar"} />
                    <AvatarFallback>{comment.fullName && convert(comment.fullName)}</AvatarFallback>
                </Avatar>
            </Link>
            <div className="flex flex-col gap-2">
                <h3 className="font-semibold">{comment.fullName}</h3>
                <p className="bg-accent dark:bg-oupia-sub rounded py-2 px-3 w-fit">{comment.commentContent}</p>
            </div>
        </div>
    )
}   

export default CommentItem;
