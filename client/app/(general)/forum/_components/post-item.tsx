"use client";

import { PostResponse } from '@/interfaces/Post';

import React from 'react';
import PostItemHeader from './post-item-header';
import PostButtons from './post-buttons';
import { Separator } from '@/components/ui/separator';
import CommentInput from './comment-input';
import PostStatus from './post-status';
import Image from 'next/image';
import { ThumbsUp } from 'lucide-react';

const PostItem = (
    { post }: { post: PostResponse }
) => {

    if (post.isDelete) {
        return null;
    }

    return (
        <div className="border shadow bg-background dark:bg-oupia-base rounded-lg flex flex-col gap-y-2 shadow-dark-theme">
            <PostItemHeader post={post} />
            <div className="flex flex-wrap gap-2 py-2 px-4">
                {post.amenities && post.amenities.length > 0 && post.amenities.map((tag, index) => {
                    return <div key={index} className="text-sm flex items-center gap-2 bg-primary/20 text-primary border border-primary-500 rounded-lg px-3 py-2">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{tag}</span>
                    </div>
                })}
            </div>
            <p className="py-2 px-4">
                {post.postContent}
            </p>
            {post.images && post.images.length > 0 && (
                <>
                    {(() => {
                        switch (post.images.length) {
                            case 1:
                                return <div className="w-full">
                                    <Image src={post.images[0]}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover aspect-3/2" />
                                </div>
                            case 2:
                                return <div className="w-full grid grid-cols-2 gap-1">
                                    <Image src={post.images[0]}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={post.images[1]}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                </div>
                            case 3:
                                return <div className="w-full grid grid-rows-2 grid-cols-5 gap-1">
                                    <Image src={post.images[0]}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full row-span-2 col-span-3" />
                                    <Image src={post.images[1]}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square col-span-2" />
                                    <Image src={post.images[2]}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square col-span-2" />
                                </div>
                            case 4:
                                return <div className="w-full grid grid-rows-2 grid-cols-2 gap-1">
                                    <Image src={post.images[0]}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={post.images[1]}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={post.images[2]}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={post.images[3]}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                </div>
                            default:
                                return <div className="w-full aspect-video grid grid-rows-2 grid-cols-2 gap-1">
                                    <Image src={post.images[0]}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={post.images[1]}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={post.images[2]}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <div className="relative w-full h-full aspect-square">
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                            <h2 className="font-semibold text-4xl">+<span>{post.images.length - 3}</span></h2>
                                        </div>
                                        <Image src={post.images[3]}
                                            alt="Post Image"
                                            width={1000}
                                            height={1000}
                                            className="object-cover w-full h-full" />
                                    </div>
                                </div>
                        }
                    })()}
                </>
            )}
            <div className="flex justify-between px-4">
                <PostButtons />
                <PostStatus />
            </div>
            <div className='px-4'>
                <Separator />
            </div>
            <CommentInput />
        </div >
    );
};

export default PostItem;