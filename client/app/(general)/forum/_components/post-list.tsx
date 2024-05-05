"use client"

import React, { useEffect } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import PostItem from './post-item';
import PostLoading from './post-loading';
import { publicApi } from '@/configs/axiosInstance';
import { postEndpoints } from '@/configs/axiosEndpoints';
import { PostResponse } from '@/interfaces/Post';
import { useInView } from "react-intersection-observer";


const fetchPosts = async ({ pageParam }: { pageParam: number }) => {
    const res = await publicApi.get(postEndpoints["postList"], {
        params: {
            page: pageParam,
        }
    });
    if (res.status === 200) {
        return res.data.content;
    } else {
        throw new Error('Error fetching posts');
    }
};

const PostList = () => {

    const { ref, inView } = useInView();

    const { data, status, hasNextPage, fetchNextPage } = useInfiniteQuery(
        {
            queryKey: ['posts'],
            queryFn: fetchPosts,
            initialPageParam: 1,
            getNextPageParam: ({ allPages, lastPage }) => {
                if (!allPages || allPages.length === 0) return undefined;
                const currentPage = allPages[allPages.length - 1];
                const nextPage = currentPage.length > 0 ? lastPage + 1 : undefined;
                return nextPage;
            }
        });

    useEffect(() => {
        console.log(inView, "inview");
        console.log(hasNextPage, "next page")
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage])


    if (status === "pending") {
        return <PostLoading />;
    }

    if (status === "error") {
        return <></>;
    }

    const posts: any = data?.pages.map((posts: any[]) => {
        return posts.map((post: PostResponse, index) => {
            return <React.Fragment key={index}>
                {
                    posts.length === index + 1
                        ? <PostItem post={post} innerRef={ref} />
                        : <PostItem post={post} />
                }
            </React.Fragment>
        })
    })

    return (
        <div className="flex flex-col gap-4 transition-all">
            {posts}
            {!hasNextPage && <p className="text-lg font-semibold py-4 text-center">Bạn đã xem hết nội dung bài viết</p>}
        </div>
    );
};

export default PostList;