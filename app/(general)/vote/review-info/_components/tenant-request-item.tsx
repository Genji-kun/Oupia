"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Vote } from '@/lib/enums';
import { ITenantRequest } from '@/lib/interfaces/User';
import { IVote } from '@/lib/interfaces/Vote';
import { convert } from '@/utils/convertAvatarAlt';
import { format } from 'date-fns';
import React, { useState } from 'react'
import { IoMdThumbsDown, IoMdThumbsUp } from 'react-icons/io';
import { useSelector } from 'react-redux';
import TenantRequestImage from './tenant-request-image';
import AssetInfoDialog from './asset-info-dialog';
import VoteDialog from './vote-dialog';

const TenantRequestItem = ({ data }: { data: ITenantRequest }) => {
    const { currentUser } = useSelector((state: any) => state.currentUserSlice);

    const [voteItem, setVoteItem] = useState<ITenantRequest>(data);
    const [hasVoted, setHasVoted] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-xl truncate text-primary uppercase font-semibold">{voteItem.assetName}</h3>
                <h5>Ngày đăng: <span className="text-muted-foreground">{format(voteItem.createdAt, "dd-MM-yyyy")}</span></h5>
            </div>
            <div className='space-y-2'>
                <div className='p-4 border rounded-lg flex flex-col gap-4 bg-background shadow-md dark:bg-oupia-base'>
                    <div className="flex justify-between gap-2 items-center">
                        <div className="flex gap-4 items-center">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={voteItem.avatar} alt={voteItem.fullName} />
                                <AvatarFallback>{convert(voteItem.fullName)}</AvatarFallback>
                            </Avatar>
                            <div className='h=fit'>
                                <h3 className='text-lg'>{voteItem.fullName}</h3>
                                <h5 className='text-muted-foreground text-sm'>Đánh giá cần xác thực</h5>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p>{voteItem.note}</p>
                        <TenantRequestImage images={voteItem.images} />
                    </div>
                </div>
                {
                    hasVoted ?
                        <Dialog>
                            <TooltipProvider>
                                <Tooltip>
                                    <DialogTrigger asChild>
                                        <TooltipTrigger asChild>
                                            <div className='cursor-pointer p-4 border rounded-lg flex justify-between items-center gap-10 bg-background shadow-md dark:bg-oupia-base hover:bg-border dark:hover:bg-oupia-sub/70'>
                                                <div className='flex-auto space-y-2 flex flex-col'>
                                                    <span className='text-sm text-muted-foreground'>Cần {100 - (voteItem.score ?? 0)} trên 100 điểm để hoàn thành</span>
                                                    <Progress value={voteItem.score} max={100} />
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <div className='flex -space-x-2 rtl:space-x-reverse items-center'>
                                                        {
                                                            !!voteItem.votes?.length && voteItem.votes.map((vote: IVote, index) => {
                                                                if (index <= 2)
                                                                    return <Avatar key={index}>
                                                                        <AvatarImage src={vote.avatar} alt={vote.voterFullName} />
                                                                        <AvatarFallback className="text-xs">{convert(vote.voterFullName)}</AvatarFallback>
                                                                    </Avatar>
                                                                if (index === voteItem.votes.length - 1)
                                                                    return <Avatar key={index}>
                                                                        <div className="text-xs p-2 w-10 h-10 bg-accent flex items-center justify-center">+{voteItem.votes.length - 3}</div>
                                                                    </Avatar>
                                                            })
                                                        }
                                                    </div>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                    </DialogTrigger>
                                    <TooltipContent align='center'>
                                        <p>Xem đánh giá chi tiết từ cộng đồng</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <DialogContent className="lg:w-1/2">
                                <DialogHeader className='space-y-0'>
                                    <h3 className='font-semibold text-xl uppercase'>Danh sách đánh giá</h3>
                                    <DialogDescription className='w-3/4 truncate text-sm'>Xem thông tin đánh giá của {voteItem.fullName}</DialogDescription>
                                </DialogHeader>
                                <Separator />
                                <ScrollArea className='h-[50vh]'>
                                    <div className='flex flex-col gap-4'>
                                        {
                                            !!voteItem.votes?.length && voteItem.votes.map((vote: IVote, index) => {
                                                return (
                                                    <div className='flex gap-4 items-start' key={index}>
                                                        <Avatar>
                                                            <AvatarImage src={vote.avatar} alt={vote.voterFullName} />
                                                            <AvatarFallback className="text-xs">{convert(vote.voterFullName)}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="space-y-2">
                                                            <div className='flex gap-2 items-center'>
                                                                <h3 className='text-lg'>{vote.voterFullName} đã</h3>
                                                                {
                                                                    vote.vote === Vote.ACCEPT ?
                                                                        <IoMdThumbsUp className='text-transparent fill-emerald-500 w-4 h-4' />
                                                                        :
                                                                        <IoMdThumbsDown className='text-transparent fill-rose-500 w-4 h-4' />
                                                                }
                                                            </div>
                                                            <p className="py-3 px-5 rounded-lg bg-border dark:bg-oupia-sub max-w-3/4">
                                                                {vote.reason}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                        :
                        <div className='p-4 border rounded-lg flex justify-between items-center gap-10 bg-background shadow-md dark:bg-oupia-base'>
                            {
                                currentUser?.id === data.userId ?
                                    <>
                                        <div className="flex gap-2 items-center flex-auto">
                                            <Avatar>
                                                <AvatarImage src={currentUser.avatar} alt={currentUser.fullName} />
                                                <AvatarFallback>{convert(currentUser.fullName ?? "")}</AvatarFallback>
                                            </Avatar>
                                            <div className='flex flex-col h-fit flex-auto gap-1'>
                                                <h5 className='text-muted-foreground text-sm'>Thông tin của bạn cần {100 - (data.score ?? 0)} điểm để xác thực thành công.</h5>
                                                <Progress value={data.score ?? 0} max={100} />
                                            </div>

                                        </div>
                                    </> : <>
                                        <div className="flex gap-2 items-center flex-auto">
                                            <VoteDialog
                                                targetId={voteItem.id}
                                                setHasVoted={setHasVoted}
                                                setVoteItem={setVoteItem} />
                                        </div>
                                        <AssetInfoDialog data={data} />
                                    </>
                            }
                        </div>
                }
            </div >
        </>

    )
}

export default TenantRequestItem