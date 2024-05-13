"use client"

import PostItem from '@/app/(general)/forum/_components/post-item';
import PostLoading from '@/app/(general)/forum/_components/post-loading';
import { postEndpoints } from '@/configs/axiosEndpoints';
import { publicApi } from '@/configs/axiosInstance';
import { useProfileContext } from '@/contexts/profile-context';
import { PostResponse } from '@/interfaces/Post';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

function UserPostList() {

    const { userInfo } = useProfileContext();

    const fetchPosts = async ({queryKey} : any) => {
        const [_key, {userInfo}] = queryKey;
        const res = await publicApi.get(postEndpoints["postList"], {
            params: {
                userId: userInfo?.id,
                size: 8
            }
        });
        if (res.status === 200) {
            return res.data.content;
        } else {
            throw new Error('Error fetching posts');
        }
    };

    const { data: posts, isLoading } = useQuery({ queryKey: ['postsProfile', {userInfo}], queryFn: fetchPosts });

    if (isLoading) {
        return <PostLoading />;
    }

    return (
        <div className="flex flex-col gap-4 transition-all">
            {posts && posts.map((post: PostResponse, index: number) => {
                return <PostItem key={index} post={post} />
            })}
        </div>
    );
}

export default UserPostList
