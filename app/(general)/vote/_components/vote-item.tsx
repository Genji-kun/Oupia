import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io"
import { ILandlordInfo } from '@/lib/types/interfaces/User'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { convert } from '@/utils/convertAvatarAlt'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Vote } from '@/lib/types/enums'
import Image from 'next/image'
import { InfoIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import dynamic from 'next/dynamic'
import { Badge } from '@/components/ui/badge'
import ReCAPTCHA from 'react-google-recaptcha'
import { RECAPTCHA_SITE_KEY } from '@/lib/constants/SettingSystem'
import { Progress } from '@/components/ui/progress'
import { IVote } from '@/lib/types/interfaces/Vote'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipProvider } from '@radix-ui/react-tooltip'


const VoteItemImage = dynamic(() => import('./vote-item-image'), {
    ssr: false,
})

const VoteDialog = dynamic(() => import('./vote-dialog'), {
    ssr: false,
})

const VoteItem = ({ data }: { data: ILandlordInfo }) => {

    const [voteItem, setVoteItem] = useState(data);
    const [hasVoted, setHasVoted] = useState(false);

    const [isVerified, setIsVerified] = useState(false);
    const [renderCaptcha, setRenderCaptcha] = useState(false);

    const [textExpanded, setTextExpanded] = useState(false);

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
                    <div className="flex justify-between gap-2 items-center">
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
                        <p>
                            {voteItem.note}
                        </p>
                        <VoteItemImage voteItem={voteItem} />
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
                                                    <span className='text-sm text-muted-foreground'>Cần {100 - voteItem.score} trên 100 điểm để hoàn thành</span>
                                                    <Progress value={voteItem.score} />
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
                                    <h3 className='font-semibold text-lg uppercase'>Danh sách đánh giá</h3>
                                    <DialogDescription className='w-3/4 truncate'>Xem thông tin đánh giá của &quot;{voteItem.assetName}&quot;</DialogDescription>
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
                            <div className="flex gap-2 items-center">
                                <VoteDialog
                                    landlordInfoId={voteItem.landlordId}
                                    setHasVoted={setHasVoted} />
                            </div>
                            <Dialog onOpenChange={(open) => setRenderCaptcha(open)}>
                                <DialogTrigger asChild>
                                    <Button variant={"normal"} className="flex items-center gap-1.5">
                                        <InfoIcon className='w-4 h-4' /> Thông tin nhà trọ
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="lg:w-1/2">
                                    <DialogHeader className='space-y-0'>
                                        <h3 className='font-semibold text-lg uppercase'>Thông tin nhà trọ</h3>
                                        <DialogDescription className='w-3/4 truncate'>Xem thông tin chi tiết của &quot;{voteItem.assetName}&quot;</DialogDescription>
                                    </DialogHeader>
                                    <Separator />
                                    <ScrollArea className='h-[50vh]'>
                                        <div className='flex flex-col gap-2'>
                                            <div>
                                                <h5 className='text-lg'>Mô tả, giới thiệu nhà trọ</h5>
                                                <p className={cn("text-muted-foreground text-sm", !textExpanded && "line-clamp-5")}>
                                                    {voteItem.assetDescription.split('\n').map((line, index) => (
                                                        <React.Fragment key={index}>
                                                            {line}
                                                            <br />
                                                        </React.Fragment>
                                                    ))}
                                                </p>
                                                <span className="cursor-pointer text-sm" onClick={() => setTextExpanded((prev) => !prev)}>{textExpanded ? "Ẩn bớt" : "Xem thêm"}</span>
                                            </div>
                                            <div className='space-y-2'>
                                                <h5 className='text-lg'>Tiện ích nhà trọ</h5>
                                                <div className="flex gap-2 flex-wrap">
                                                    {
                                                        voteItem.amenities?.map((amenity, index: number) => {
                                                            return <React.Fragment key={index}>
                                                                <Badge className="border text-white bg-primary py-1 px-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lucide lucide-circle-check-big"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>                                            <span className="text-base">
                                                                            {amenity.amenityName}
                                                                        </span>
                                                                    </div>
                                                                </Badge>
                                                            </React.Fragment>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-4 w-full'>
                                                <h5 className='text-lg leading-0'>Giấy phép kinh doanh</h5>
                                                {(renderCaptcha && !!RECAPTCHA_SITE_KEY) &&
                                                    <ReCAPTCHA className='mx-auto z-[9999]'
                                                        sitekey={RECAPTCHA_SITE_KEY}
                                                        onChange={(token) => setIsVerified(!!token)} />
                                                }
                                                {
                                                    isVerified && <Image src={data.businessLicense}
                                                        alt="Bussiness License Image"
                                                        width={1000}
                                                        height={1000}
                                                        className="object-cover w-3/4 mx-auto" />
                                                }
                                            </div>
                                        </div>
                                    </ScrollArea>
                                </DialogContent>
                            </Dialog>
                        </div>
                }
            </div >
        </>

    )
}

export default VoteItem