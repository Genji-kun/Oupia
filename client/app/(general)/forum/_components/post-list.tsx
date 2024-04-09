"use client";

import React, { Suspense, useEffect, useState } from 'react';
import PostItem from './post-item';
import PostLoading from './post-loading';
import { publicApi } from '@/configs/axiosInstance';
import { postEndpoints } from '@/configs/axiosEndpoints';
import { useForumContext } from '@/contexts/forum-context';

const PostList = () => {

    const { posts, setPosts } = useForumContext();

    useEffect(() => {
        fetchPostData();
    }, [])

    const fetchPostData = async () => {
        try {
            const res = await publicApi.get(postEndpoints["postList"]);
            if (res.status === 200) {
                setPosts(res.data.content);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                posts.length === 0 ?
                    <PostLoading /> : <div className="flex flex-col gap-4 transition-all">
                        {posts.map((post, index) => {
                            return <PostItem key={index} post={post} />
                        })}
                    </div>
            }
        </>
    );
};

export default PostList;