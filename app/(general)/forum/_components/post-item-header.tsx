"use client"

import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { Calendar, EditIcon, Info, Loader2, Map, MapPin, MessagesSquare, Search, UserRoundCheck, UsersRound, X, XSquare } from 'lucide-react';
import Link from 'next/link';

import { PostResponse } from '@/lib/interfaces/Post';
import React, { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { BsThreeDots } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { convert } from '@/utils/convertAvatarAlt';
import { format, formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSelector } from 'react-redux';
import { postEndpoints, userEndpoints } from '@/configs/axiosEndpoints';
import { useForumContext } from '@/contexts/forum-context';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import PostUpdateDialog from './post-update-dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { usePostUpdateContext } from '@/contexts/post-update-context';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { UserInfo } from '@/lib/interfaces/User';
import { api } from '@/lib/api';


const PostItemHeader = ({ post }: { post: PostResponse }) => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const { posts, setPosts } = useForumContext();
    const { updatePost, setUpdatePost } = usePostUpdateContext();

    const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (post) {
            setUpdatePost({
                postContent: post.postContent,
                postType: post.postType,
            });
        }
    }, [post, setUpdatePost])

    useEffect(() => {
        const fetchUserInfoData = async (username: string) => {
            try {
                const url = userEndpoints.getUserByUsername(username);
                const res = await api.get(url);
                if (res.status === 200) {
                    setUserInfo(res.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        if (post) {
            fetchUserInfoData(post.username);
        }
    }, [post])

    const handleUpdate = async () => {
        setIsSubmitting(true);
        if (updatePost) {
            const form = new FormData();
            form.append('post', new Blob([JSON.stringify(updatePost)], { type: "application/json" }))
            try {
                const url = postEndpoints.updatePost(post.id);
                const res = await api.put(url, form);
                if (res.status === 200) {
                    toast("Cập nhật bài viết thành công.")
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    const deletePost = async (id: number) => {
        try {
            const url = postEndpoints.deletePost(id);
            const res = await api.delete(url);
            if (res.status === 200) {
                setPosts(posts.filter((post: PostResponse) => post.id !== id))
                toast.success("Xóa bài viết thành công.")
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
                                {
                                    isLoading && <>
                                        <Skeleton className="w-full h-5 rounded-full bg-border dark:bg-oupia-sub" />
                                        <Skeleton className="w-1/2 h-5 rounded-full bg-border dark:bg-oupia-sub" />
                                        <Skeleton className="w-2/3 h-5 rounded-full bg-border dark:bg-oupia-sub" />
                                    </>
                                }
                                {userInfo && <>
                                    <div className="flex gap-2 items-center ">
                                        <Info size={16} />
                                        <span className="text-sm">
                                            {(() => {
                                                switch (userInfo.role) {
                                                    case "ROLE_TENANT":
                                                        return "Người tìm trọ"
                                                    case "ROLE_LANDLORD":
                                                        return "Chủ nhà trọ"
                                                    case "ROLE_ADMIN":
                                                        return "Quản trị viên"
                                                    default:
                                                        return <></>
                                                }
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 items-center ">
                                        <UsersRound size={16} />
                                        <span className="text-sm">Có {userInfo.totalFollower} người theo dõi</span>
                                    </div>
                                    <div className="flex gap-2 items-center ">
                                        <Calendar size={16} />
                                        <span className="text-sm">Tham gia vào {format(userInfo.createdAt, "dd-MM-yyyy")}</span>
                                    </div>
                                </>}
                                <Separator />
                                {
                                    currentUser &&
                                    <Link href={`/messages/${post.username}`} className="w-full">
                                        <Button className="styled-button flex gap-x-2 w-full">
                                            <MessagesSquare size={16} />
                                            <span>Nhắn tin</span>
                                        </Button>
                                    </Link>
                                }
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
                                {
                                    isLoading && <>
                                        <Skeleton className="w-full h-5 rounded-full bg-border dark:bg-oupia-sub" />
                                        <Skeleton className="w-1/2 h-5 rounded-full bg-border dark:bg-oupia-sub" />
                                        <Skeleton className="w-2/3 h-5 rounded-full bg-border dark:bg-oupia-sub" />
                                    </>
                                }
                                {userInfo && <>
                                    <div className="flex gap-2 items-center ">
                                        <Info size={16} />
                                        <span className="text-sm">
                                            {(() => {
                                                switch (userInfo.role) {
                                                    case "ROLE_TENANT":
                                                        return "Người tìm trọ"
                                                    case "ROLE_LANDLORD":
                                                        return "Chủ nhà trọ"
                                                    case "ROLE_ADMIN":
                                                        return "Quản trị viên"
                                                    default:
                                                        return <></>
                                                }
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 items-center ">
                                        <UsersRound size={16} />
                                        <span className="text-sm">Có {userInfo.totalFollower} người theo dõi</span>
                                    </div>
                                    <div className="flex gap-2 items-center ">
                                        <Calendar size={16} />
                                        <span className="text-sm">Tham gia vào {format(userInfo.createdAt, "dd-MM-yyyy")}</span>
                                    </div>
                                </>}
                                <Separator />
                                {
                                    currentUser &&
                                    <Link href={`/messages/${post.username}`} className="w-full">
                                        <Button className="styled-button flex gap-x-2 w-full">
                                            <MessagesSquare size={16} />
                                            <span>Nhắn tin</span>
                                        </Button>
                                    </Link>
                                }
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
                <h4 className="text-muted-foreground text-xs">{formatDistanceToNow(post.createdAt, { addSuffix: true, locale: vi })}</h4>
            </div>
            <div className="ml-auto flex gap-1">
                <TooltipProvider>
                    {post.fullLocation && <>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant={"ghost"} className="p-2 rounded-full w-fit h-fit">
                                    <Map size="16" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{post.fullLocation}</p>
                            </TooltipContent>
                        </Tooltip>
                    </>}
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
                    {currentUser && post.userId === currentUser.id && <>
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
                                <>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant={"ghost"} className="justify-start gap-2 px-4 py-2">
                                                <EditIcon className="w-4 h-4" />
                                                <span>Chỉnh sửa bài viết</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-xl max-h-[calc(100vh-80px)] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle><span className="text-2xl">Chỉnh sửa bài viết</span></DialogTitle>
                                                <DialogDescription>
                                                    <span className="text-red-600 underline mr-1">
                                                        Lưu ý:
                                                    </span>
                                                    <span>
                                                        Bạn không thể sửa đổi hình ảnh trong bài viết.
                                                    </span>
                                                </DialogDescription>
                                            </DialogHeader>
                                            <PostUpdateDialog post={post} />
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant={"outline"} type="button">
                                                        <span className="text-sm">
                                                            Hủy
                                                        </span>
                                                    </Button>
                                                </DialogClose>
                                                <Button disabled={isSubmitting} className="styled-button gap-2" onClick={handleUpdate}>
                                                    {
                                                        isSubmitting ?
                                                            <>
                                                                <span className="text-base">Đang xử lý</span>
                                                                <Loader2 size="22" className="animate-spin" />
                                                            </>
                                                            :
                                                            <>
                                                                <span className="text-sm">
                                                                    Cập nhật
                                                                </span>
                                                            </>
                                                    }

                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <Button variant={"ghost"} className="justify-start gap-2 px-4 py-2 w-full">
                                                <XSquare className="w-4 h-4" />
                                                <span>Xóa bài viết</span>
                                            </Button>
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
                                </>
                            </PopoverContent>
                        </Popover>
                    </>
                    }
                </TooltipProvider>
            </div>
        </div>
    );
};

export default PostItemHeader;