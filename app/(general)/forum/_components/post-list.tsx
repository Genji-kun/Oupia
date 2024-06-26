"use client"

import React, { useEffect } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import PostItem from './post-item';
import PostLoading from './post-loading';
import { PostResponse } from '@/lib/types/interfaces/Post';
import { useInView } from "react-intersection-observer";
import { useForumContext } from '@/contexts/forum-context';
import { Skeleton } from '@/components/ui/skeleton';



const PostList = () => {

    const { fetchNextPage, hasNextPage, posts, isLast, isFetching } = useForumContext();

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isLast) {
            fetchNextPage();
        }
    }, [inView, hasNextPage])

    return (
        <div className="flex flex-col gap-4 transition-all h-fit">
            <>
                {
                    posts.length > 0 && posts.map((post: PostResponse, index) => {
                        return <React.Fragment key={index}>
                            {
                                posts.length === index + 1
                                    ? <PostItem post={post} innerRef={ref} />
                                    : <PostItem post={post} />
                            }
                        </React.Fragment>
                    })
                }
                {
                    isFetching && <>
                        <Skeleton className='bg-border dark:bg-oupia-sub w-full aspect-[25/9]' />
                        <Skeleton className='bg-border dark:bg-oupia-sub w-full aspect-[25/9]' />
                        <Skeleton className='bg-border dark:bg-oupia-sub w-full aspect-[25/9]' />
                        <Skeleton className='bg-border dark:bg-oupia-sub w-full aspect-[25/9]' />
                    </>
                }
            </>
            {isLast && <p className="text-lg font-semibold py-4 text-center">Bạn đã xem hết nội dung bài viết</p>}
        </div>
    );
};

export default PostList;