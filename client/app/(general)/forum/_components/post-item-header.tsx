"use client"

import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { Calendar, EditIcon, Info, MessagesSquare, Search, UserRoundCheck, UsersRound, X } from 'lucide-react';
import Link from 'next/link';

import { PostResponse } from '@/interfaces/Post';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { BsThreeDots } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { convert } from '@/utils/convertAvatarAlt';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSelector } from 'react-redux';
import { postEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { useForumContext } from '@/contexts/forum-context';

const PostItemHeader = ({ post }: { post: PostResponse }) => {

    const { user } = useSelector((state: any) => state.currentUserSlice);
    const { posts, setPosts } = useForumContext();

    const deletePost = async (id: number) => {
        try {
            const url = postEndpoints.deletePost(id);
            const res = await authApi.delete(url);
            if (res.status === 200) {
                setPosts(posts.filter((post: PostResponse) => post.id !== id))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex gap-x-3 items-start p-4 pb-0">
            <div>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Link href={`/profile/${post.username}`}>
                            <Avatar className='w-12 h-12'>
                                <AvatarImage src={post.userAvatar} alt={post.username} />
                                <AvatarFallback>{post.userFullName && convert(post.userFullName)}</AvatarFallback>
                            </Avatar>
                        </Link>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96">
                        <div className="grid grid-cols-8 gap-x-5 w-full">
                            <div className="col-span-2 mx-auto">
                                <Link href={`/profile/${post.username}`}>
                                    <Avatar className='w-16 h-16'>
                                        <AvatarImage src={post.userAvatar} alt={post.username} />
                                        <AvatarFallback>{post.userFullName && convert(post.userFullName)}</AvatarFallback>
                                    </Avatar>
                                </Link>
                            </div>
                            <div className="col-span-6 flex flex-col gap-y-2">
                                <h2 className="font-semibold text-xl">{post.userFullName && post.userFullName!}</h2>
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
                        <Link href={`/profile/${post.username}`}>
                            <h2 className="font-semibold hover:underline leading-0">{post.userFullName && post.userFullName!}</h2>
                        </Link>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96">
                        <div className="grid grid-cols-8 gap-x-5 w-full">
                            <div className="col-span-2 mx-auto">
                                <Link href={`/profile/${post.username}`}>
                                    <Avatar className='w-16 h-16'>
                                        <AvatarImage src={post.userAvatar} alt={post.username} />
                                        <AvatarFallback>{post.userFullName && convert(post.userFullName)}</AvatarFallback>
                                    </Avatar>
                                </Link>
                            </div>
                            <div className="col-span-6 flex flex-col gap-y-2">
                                <h2 className="font-semibold text-xl">{post.userFullName && post.userFullName!}</h2>
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
                <h4 className="text-muted-foreground text-xs">{formatDistanceToNow(post.createdAt, { addSuffix: true, locale: vi })}</h4>
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
                    {user && <>
                        <Popover>
                            <PopoverTrigger>
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
                            </PopoverTrigger>
                            <PopoverContent side='bottom' align='end' className="mb-1 flex flex-col w-fit z-10 p-2">
                                {post.userId === user.id && <Button variant={"ghost"} className="justify-start gap-2 px-4 py-2">
                                    <EditIcon className="w-4 h-4" />
                                    <span>Chỉnh sửa bài viết</span>
                                </Button>}
                            </PopoverContent>
                        </Popover>
                        {
                            post.userId === user.id &&
                            <AlertDialog>
                                <AlertDialogTrigger>
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
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Xóa bài viết này?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Bài viết sẽ được xóa và thông tin sẽ không hiển thị trong diễn đàn nữa. Bạn có chắc chứ?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => { deletePost(post.id); }}
                                            className="bg-destructive/70 hover:bg-destructive text-destructive-foreground">Xóa</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        }
                    </>}
                </TooltipProvider>
            </div>
        </div>
    );
};

export default PostItemHeader;