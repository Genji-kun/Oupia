import React, { useState } from 'react'
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io"
import { ILandlordInfo } from '@/lib/interfaces/User'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { convert } from '@/utils/convertAvatarAlt'
import { format } from 'date-fns'
import { Vote } from '@/lib/enums'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import dynamic from 'next/dynamic'
import { Progress } from '@/components/ui/progress'
import { IVote } from '@/lib/interfaces/Vote'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import AssetInfoDialog from './asset-info-dialog'
import { useSelector } from 'react-redux'


const VoteItemImage = dynamic(() => import('./vote-item-image'), {
    ssr: false,
})

const VoteDialog = dynamic(() => import('./vote-dialog'), {
    ssr: false,
})

const VoteItem = ({ data }: { data: ILandlordInfo }) => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);

    const [voteItem, setVoteItem] = useState(data);
    const [hasVoted, setHasVoted] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-xl truncate text-primary uppercase font-semibold">{voteItem.assetName}</h3>
                <div className="flex gap-1 items-center">
                    <h5>Ngày đăng: <span className="text-muted-foreground">{format(voteItem.createdAt, "dd-MM-yyyy")}</span>
                    </h5>
                </div>
            </div>
            <div className='space-y-2'>
                <div className='p-4 border rounded-lg flex flex-col gap-4 bg-background shadow-md dark:bg-oupia-base'>
                    <div className="flex justify-between gap-4 items-center">
                        <div className="flex gap-2 items-center">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={voteItem.landlordAvatar} alt={voteItem.landlordName} />
                                <AvatarFallback>{convert(voteItem.landlordName)}</AvatarFallback>
                            </Avatar>
                            <div className='h=fit'>
                                <h3 className='text-lg'>{voteItem.landlordName}</h3>
                                <h5 className='text-muted-foreground text-sm'>Chủ trọ cần xác thực</h5>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p>{voteItem.note}</p>
                        <VoteItemImage images={voteItem.images} />
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
                                                    {
                                                        voteItem.score >= 100 ?
                                                            <>
                                                                <span className='text-sm text-muted-foreground'>Thông tin đã đủ điểm xác thực.</span>
                                                                <Progress value={100} max={100} />
                                                            </>
                                                            :
                                                            <>
                                                                <span className='text-sm text-muted-foreground'>Điểm đánh giá hiện tại là {voteItem.score}, cần {100 - voteItem.score} điểm để hoàn thành xác thực.</span>
                                                                <Progress value={voteItem.score} max={100} />
                                                            </>
                                                    }
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
                                    <h3 className='font-semibold text-xl uppercase'>Danh sách xác thực</h3>
                                    <DialogDescription className='w-3/4 truncate text-sm'>Xem thông tin người dùng xác thực của &quot;{voteItem.assetName}&quot;</DialogDescription>
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
                                currentUser?.id === data.landlordId ?
                                    <>
                                        <div className="flex gap-2 items-center flex-auto">
                                            <Avatar>
                                                <AvatarImage src={currentUser.avatar} alt={currentUser.fullName} />
                                                <AvatarFallback>{convert(currentUser.fullName ?? "")}</AvatarFallback>
                                            </Avatar>
                                            <div className='flex flex-col h-fit flex-auto gap-1'>
                                                <h5 className='text-muted-foreground text-sm'>Thông tin của bạn cần {100 - data.score} điểm để xác thực thành công.</h5>
                                                <Progress value={data.score} max={100} />
                                            </div>

                                        </div>
                                    </> : <>
                                        <div className="flex gap-2 items-center flex-auto">
                                            <VoteDialog
                                                landlordInfoId={voteItem.landlordId}
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

export default VoteItem