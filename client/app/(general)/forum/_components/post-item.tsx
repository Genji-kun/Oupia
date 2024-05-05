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
import { useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { PostUpdateProvider } from '@/contexts/post-update-context';
import { PostFavouriteProvider } from '@/contexts/post-favourite-context';
import CommentList from './comment-list';

const PostItem = (
    { post, innerRef }: { post: PostResponse, innerRef?: any }
) => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);

    if (post.isDelete) {
        return null;
    }

    return (
        <div ref={innerRef} className="border shadow bg-background dark:bg-oupia-base rounded-lg flex flex-col gap-y-2 shadow-dark-theme">
            <PostUpdateProvider>
                <PostItemHeader post={post} />
            </PostUpdateProvider>

            <p className="py-2 px-4">
                {post.postContent.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}
            </p>

            {
                post.amenities && post.amenities.length > 0 && <div className="flex flex-wrap gap-2 pb-2 px-4">
                    {
                        post.amenities.map((tag, index) => {
                            if (index < 2) {
                                return <div key={index} className="text-sm flex items-center gap-1.5 bg-primary/20 text-primary border border-primary-500 rounded-lg h-fit px-3 py-1.5">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{tag}</span>
                                </div>
                            }
                        })
                    }
                    {
                        post.amenities && post.amenities.length > 2 && <div className="text-sm flex items-center bg-primary/20 text-primary border border-primary-500 rounded-lg h-fit px-3 py-1.5">
                            <span>+{post.amenities.length - 2}</span>
                        </div>
                    }
                </div>
            }
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

            {/* {post.ass && <div className='w-full flex items-center gap-4 border-y'>
                <Image src={tagAsset.images[0]} alt="Asset Image" className="w-20 aspect-square object-cover" width={500} height={500} />
                <div className="flex-grow flex flex-col justify-center h-fit">
                    <h3 className="line-clamp-1 font-semibold text-lg">{tagAsset.assetName}</h3>
                    <h4 className="text-primary text-sm">{numberToCurrency(tagAsset.price)}</h4>
                </div>
            </div>} */}

            <PostFavouriteProvider>
                <div className={cn("flex justify-between px-4", !currentUser && "py-2")}>
                    <PostButtons post={post} />
                    <PostStatus post={post} />
                </div>
            </PostFavouriteProvider>
            <div className='px-4'>
                <Separator />
            </div>
            <CommentList postId={post.id} />
            <CommentInput postId={post.id} />
        </div >
    );
};

export default PostItem;