"use client";

import { Post } from '@/interfaces/Post';

import React from 'react';
import PostItemHeader from './post-item-header';
import PostButtons from './post-buttons';
import PostStatus from './post-status';

const PostItem = (
    { post }: { post: Post }
) => {
    return (
        <div className="border border-border shadow rounded-lg flex flex-col gap-y-2">
            <PostItemHeader post={post} />
            <div className="px-4">
                {post.postContent}
            </div>
            <PostStatus />
            <PostButtons />
        </div >
    );
};

export default PostItem;