"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { convert } from '@/utils/convertAvatarAlt';
import { MessageSquareText, Search, ThumbsUp, X } from 'lucide-react';
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useUploadContext } from '@/contexts/upload-context';

const PostItemReview = (
    { post }: { post: any }
) => {

    const { user } = useSelector((state: any) => state.currentUserSlice);
    const { images } = useUploadContext();

    const [text, setText] = useState<string>("");

    return (
        <div className="border shadow bg-background dark:bg-oupia-base rounded-lg flex flex-col gap-y-2  shadow-dark-theme w-4/5 2xl:w-1/2">
            <div className="flex gap-x-3 items-start p-4 pb-0">
                <div>
                    <Avatar className='w-12 h-12'>
                        <AvatarImage src={user.avatar} alt={user.username} />
                        <AvatarFallback>{convert(user.fullName)}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="h-full flex flex-col justify-center">
                    <h2 className="font-semibold hover:underline leading-0">{user.fullName}</h2>
                    <h4 className="text-muted-foreground text-xs">1 giờ trước</h4>
                </div>
                <div className="ml-auto flex gap-1">
                    <TooltipProvider>
                        {(() => {
                            switch (post.postType) {
                                case "POST_FIND":
                                    return <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant={"ghost"} className="p-2 rounded-full w-fit h-fit">
                                                <Search size="16" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Tôi cần tìm nơi cho thuê</p>
                                        </TooltipContent>
                                    </Tooltip>
                                case "POST_RENT":
                                    return <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant={"ghost"} className="p-2 rounded-full w-fit h-fit">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" /><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 16 6 6" /><circle cx="16" cy="9" r="2.9" /><circle cx="6" cy="5" r="3" /></svg>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Tôi cho thuê căn hộ</p>
                                        </TooltipContent>
                                    </Tooltip>
                                default:
                                    return <></>
                            }
                        })()}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant={"ghost"} className="p-2 rounded-full w-fit h-fit">
                                    <BsThreeDots size="16" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Tùy chọn</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant={"ghost"} className="p-2 rounded-full w-fit h-fit">
                                    <X size="16" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Xóa bài viết</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <p className="pt-2 mb-2 px-4 line-clamp-3">
                {post.postContent}
            </p>
            {images && images.length > 0 && (
                <>
                    {(() => {
                        switch (images.length) {
                            case 1:
                                return <div className="w-full">
                                    <Image src={URL.createObjectURL(images[0])}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover aspect-3/2" />
                                </div>
                            case 2:
                                return <div className="w-full grid grid-cols-2 gap-1">
                                    <Image src={URL.createObjectURL(images[0])}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={URL.createObjectURL(images[1])}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                </div>
                            case 3:
                                return <div className="w-full grid grid-rows-2 grid-cols-5 gap-1">
                                    <Image src={URL.createObjectURL(images[0])}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full row-span-2 col-span-3" />
                                    <Image src={URL.createObjectURL(images[1])}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square col-span-2" />
                                    <Image src={URL.createObjectURL(images[2])}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square col-span-2" />
                                </div>
                            case 4:
                                return <div className="w-full grid grid-rows-2 grid-cols-2 gap-1">
                                    <Image src={URL.createObjectURL(images[0])}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={URL.createObjectURL(images[1])}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={URL.createObjectURL(images[2])}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={URL.createObjectURL(images[3])}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                </div>
                            default:
                                return <div className="w-full aspect-video grid grid-rows-2 grid-cols-2 gap-1">
                                    <Image src={URL.createObjectURL(images[0])}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={URL.createObjectURL(images[1])}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={URL.createObjectURL(images[2])}
                                        alt="Post Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <div className="relative w-full h-full aspect-square">
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                            <h2 className="font-semibold text-4xl">+<span>{images.length - 3}</span></h2>
                                        </div>
                                        <Image src={URL.createObjectURL(images[3])}
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
                <div className="flex gap-1">
                    <Button variant={"ghost"} className="flex gap-x-2 px-3 h-fit">
                        <ThumbsUp size="20" />
                        <span className="text-sm font-semibold">Thích</span>
                    </Button>
                    <Button variant={"ghost"} className="flex gap-x-2 px-3 h-fit">
                        <MessageSquareText size="20" />
                        <span className="text-sm font-semibold">Bình luận</span>
                    </Button>
                </div>
                <div className="flex items-center px-4 gap-2">
                    <div className="flex gap-x-1 items-center">
                        <div className="rounded-full p-1 bg-primary">
                            <ThumbsUp size="10" fill="white" className="text-primary transform scale-x-[-1]" />
                        </div>
                        <span className="text-sm">12</span>
                    </div>
                    <Separator orientation='vertical' className="w-[2px] h-1/2" />
                    <div className="cursor-pointer hover:underline">
                        <h2 className="text-sm">6 bình luận</h2>
                    </div>
                </div>
            </div>
            <div className="px-4">
                <Separator />
            </div>
            <div className='p-4 pt-0'>
                <Input
                    value={text}
                    onChange={(evt) => setText(evt.target.value)}
                    placeholder='Nhập bình luận...'
                    className="p-0 border-none dark:bg-transparent" />
            </div>
        </div >
    );
};

export default PostItemReview;