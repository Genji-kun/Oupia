"use client"

import React, { useEffect } from 'react';
import PostItem from './post-item';
import PostLoading from './post-loading';
import { PostResponse } from '@/lib/interfaces/Post';
import { useInView } from "react-intersection-observer";
import { useForumContext } from '@/contexts/forum-context';

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
                    isFetching && <PostLoading />


                }
            </>
            {isLast && <p className="text-lg font-semibold py-4 text-center">Bạn đã xem hết nội dung bài viết</p>}
        </div>
    );
};

export default PostList;