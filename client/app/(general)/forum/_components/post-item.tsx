"use client";

import { Post } from '@/interfaces/Post';

import React from 'react';
import PostItemHeader from './post-item-header';
import PostButtons from './post-buttons';
import { Separator } from '@/components/ui/separator';
import CommentInput from './comment-input';
import PostStatus from './post-status';

const PostItem = (
    { post }: { post: Post }
) => {
    return (
        <div className="border shadow bg-background dark:bg-oupia-base rounded-lg flex flex-col gap-y-2 p-4 shadow-dark-theme">
            <PostItemHeader post={post} />
            <p className="py-2">
                {post.postContent}
            </p>
            <div className="flex justify-between">
                <PostButtons />
                <PostStatus />
            </div>
            <Separator />
            <CommentInput />
        </div >
    );
};

export default PostItem;