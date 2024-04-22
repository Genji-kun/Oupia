"use client"

import { Separator } from '@/components/ui/separator';
import { favouriteEndpoints } from '@/configs/axiosEndpoints';
import { publicApi } from '@/configs/axiosInstance';
import { usePostFavouriteContext } from '@/contexts/post-favourite-context';
import { PostResponse } from '@/interfaces/Post';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { RiHeart3Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

const PostStatus = ({ post }: { post: PostResponse }) => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const { totalFavourites, setTotalFavourites, isLoading, setIsLoading } = usePostFavouriteContext();

    useEffect(() => {
        fetchFavourCount();
    }, []);

    const fetchFavourCount = async () => {
        try {
            const res = await publicApi.get(favouriteEndpoints.favourCount(post.id));
            if (res.status === 200) {
                setTotalFavourites(res.data.totalElements);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("flex items-center gap-2", currentUser ? "justify-between" : " ml-auto")}>
            {
                isLoading ?
                    <div className="flex gap-1">
                        <div className="bg-border dark:bg-oupia-sub py-4 px-8 animate-pulse rounded"></div>
                        <div className="bg-border dark:bg-oupia-sub py-4 px-10 animate-pulse rounded"></div>
                    </div> : <>
                        {totalFavourites > 0 && <>
                            <span className="text-sm">{totalFavourites}</span>
                            <div className="flex gap-x-1 items-center">
                                <div className="rounded-full p-1 bg-heart">
                                    <RiHeart3Fill size="10" className="fill-white" />
                                </div>
                            </div>
                        </>}
                        <Separator orientation='vertical' className="w-[2px] h-1/2" />
                        <div className="cursor-pointer hover:underline">
                            <h2 className="text-sm">6 bình luận</h2>
                        </div>
                    </>
            }
        </div>
    );
};

export default PostStatus;