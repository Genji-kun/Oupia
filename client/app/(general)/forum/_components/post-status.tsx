"use client"

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Heart, ThumbsUp } from 'lucide-react';
import React from 'react';
import { RiHeart3Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

const PostStatus = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice)

    return (
        <div className={cn("flex items-center gap-2", currentUser ? "justify-between" : " ml-auto")}>
            <span className="text-sm">12</span>
            <div className="flex gap-x-1 items-center">
                <div className="rounded-full p-1 bg-heart">
                    <RiHeart3Fill size="10" className="fill-white" />
                </div>
            </div>
            <Separator orientation='vertical' className="w-[2px] h-1/2" />
            <div className="cursor-pointer hover:underline">
                <h2 className="text-sm">6 bình luận</h2>
            </div>
        </div>
    );
};

export default PostStatus;