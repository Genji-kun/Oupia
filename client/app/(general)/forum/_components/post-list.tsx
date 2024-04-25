"use client"

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PostItem from './post-item';
import PostLoading from './post-loading';
import { publicApi } from '@/configs/axiosInstance';
import { postEndpoints } from '@/configs/axiosEndpoints';
import { PostResponse } from '@/interfaces/Post';

const fetchPosts = async () => {
    const res = await publicApi.get(postEndpoints["postList"]);
    if (res.status === 200) {
        return res.data.content;
    } else {
        throw new Error('Error fetching posts');
    }
};

const PostList = () => {
    const { data: posts, isLoading } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });

    if (isLoading) {
        return <PostLoading />;
    }

    return (
        <div className="flex flex-col gap-4 transition-all">
            {posts.map((post : PostResponse, index: number) => {
                return <PostItem key={index} post={post} />
            })}
        </div>
    );
};

export default PostList;
