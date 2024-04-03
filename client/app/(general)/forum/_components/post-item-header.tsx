"use client"

import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Info, MessagesSquare, UserRoundCheck, UsersRound, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Post } from '@/interfaces/Post';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BsThreeDots } from "react-icons/bs";


const PostItemHeader = ({ post }: { post: Post }) => {
    return (
        <div className="flex gap-x-3 items-start">
            <div>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div>
                            <Link href={`/profile/${post.user.account?.username}`}>
                                <Image src={post.user.avatar} width={160} height={160} alt="User Avatar" className="rounded-full w-12 aspect-square object-cover" />
                            </Link>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96">
                        <div className="grid grid-cols-8 gap-x-5 w-full">
                            <div className="col-span-2">
                                <Link href={`/profile/${post.user.account?.username}`}>
                                    <Image src={post.user.avatar} width={160} height={160} alt="User Avatar" className="rounded-full w-16 h-16 object-cover mx-auto" />
                                </Link>
                            </div>
                            <div className="col-span-6 flex flex-col gap-y-2">
                                <div>
                                    <Link href={`/profile/${post.user.account?.username}`}>
                                        <h2 className="font-semibold text-2xl">{post.user.fullName}</h2>
                                    </Link>
                                </div>
                                <Separator />
                                <div className="flex gap-2 items-center ">
                                    <Info size={16} />
                                    <span className="text-sm">Nguời tìm trọ</span>
                                </div>
                                <div className="flex gap-2 items-center ">
                                    <UsersRound size={16} />
                                    <span className="text-sm">Có 2 người theo dõi</span>
                                </div>
                                <div className="flex gap-2 items-center ">
                                    <Calendar size={16} />
                                    <span className="text-sm">Tham gia vào 14-11-2002</span>
                                </div>
                                <Separator />
                                <div className="flex w-full gap-2">
                                    <Button className="styled-button flex gap-x-2">
                                        <MessagesSquare size={16} />
                                        <span>Nhắn tin</span>
                                    </Button>
                                    <Button variant={"ghost"} className="text-base bg-border/80 hover:bg-border flex gap-x-2">
                                        <UserRoundCheck size={16} />
                                        <span>Theo dõi</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <div className="h-full flex flex-col justify-center">
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Link href={`/profile/${post.user.account?.username}`}>
                            <h2 className="font-semibold hover:underline leading-0">{post.user.fullName}</h2>
                        </Link>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96">
                        <div className="grid grid-cols-8 gap-x-5 w-full">
                            <div className="col-span-2">
                                <Link href={`/profile/${post.user.account?.username}`} >
                                    <Image src={post.user.avatar} width={160} height={160} alt="User Avatar" className="rounded-full w-16 h-16 object-cover mx-auto" />
                                </Link>
                            </div>
                            <div className="col-span-6 flex flex-col gap-y-2">
                                <div>
                                    <Link href={`/profile/${post.user.account?.username}`}>
                                        <h2 className="font-semibold text-2xl">{post.user.fullName}</h2>
                                    </Link>
                                </div>
                                <Separator />
                                <div className="flex gap-2 items-center ">
                                    <Info size={16} />
                                    <span className="text-sm">Nguời tìm trọ</span>
                                </div>
                                <div className="flex gap-2 items-center ">
                                    <UsersRound size={16} />
                                    <span className="text-sm">Có 2 người theo dõi</span>
                                </div>
                                <div className="flex gap-2 items-center ">
                                    <Calendar size={16} />
                                    <span className="text-sm">Tham gia vào 14-11-2002</span>
                                </div>
                                <Separator />
                                <div className="flex w-full gap-2">
                                    <Button className="styled-button flex gap-x-2">
                                        <MessagesSquare size={16} />
                                        <span>Nhắn tin</span>
                                    </Button>
                                    <Button variant={"ghost"} className="text-base bg-border/80 hover:bg-border flex gap-x-2">
                                        <UserRoundCheck size={16} />
                                        <span>Theo dõi</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
                <h4 className="text-muted-foreground text-xs">1 giờ trước</h4>
            </div>
            <div className="ml-auto flex gap-1">
                <TooltipProvider>
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
    );
};

export default PostItemHeader;