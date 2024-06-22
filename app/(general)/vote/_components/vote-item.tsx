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
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import ReCAPTCHA from 'react-google-recaptcha'
import { RECAPTCHA_SITE_KEY } from '@/lib/constants/SettingSystem'

const VoteDialog = dynamic(() => import('./vote-dialog'), {
    ssr: false,
})

const VoteItem = ({ data }: { data: ILandlordInfo }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [renderCaptcha, setRenderCaptcha] = useState(false);

    const [voteType, setvoteType] = useState<Vote>(Vote.UNKNOWN);
    const [textExpanded, setTextExpanded] = useState(false);

    const handleVote = (vote: Vote) => {
        setIsOpen(true);
        setvoteType(vote);
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-xl truncate text-primary uppercase font-semibold">{data.assetName}</h3>
                <div className="flex gap-1 items-center">
                    <h5>Ngày đăng: <span className="text-muted-foreground">{format(data.createdAt, "dd-MM-yyyy")}</span>
                    </h5>
                </div>
            </div>
            <div className='space-y-2'>
                <div className='p-4 border rounded-lg flex flex-col gap-4 bg-background shadow-md dark:bg-oupia-base'>
                    <div className="flex gap-2 items-center">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={data.landlordAvatar} alt={data.landlordName} />
                            <AvatarFallback>{convert(data.landlordName)}</AvatarFallback>
                        </Avatar>
                        <div className='h=fit'>
                            <h3 className='text-lg'>{data.landlordName}</h3>
                            <h5 className='text-muted-foreground text-sm'>Chủ trọ cần xác thực</h5>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p>
                            {data.note}
                        </p>
                        {data?.images.length > 0 && (
                            <>
                                {(() => {
                                    switch (data.images.length) {
                                        case 3:
                                            return <div className="w-full grid grid-rows-2 grid-cols-5 gap-1">
                                                <Image src={data.images[0].url}
                                                    alt="Asset Image"
                                                    width={1000}
                                                    height={1000}
                                                    className="object-cover w-full h-full row-span-2 col-span-3" />
                                                <Image src={data.images[1].url}
                                                    alt="Asset Image"
                                                    width={1000}
                                                    height={1000}
                                                    className="object-cover w-full h-full aspect-square col-span-2" />
                                                <Image src={data.images[2].url}
                                                    alt="Asset Image"
                                                    width={1000}
                                                    height={1000}
                                                    className="object-cover w-full h-full aspect-square col-span-2" />
                                            </div>
                                        case 4:
                                            return <div className="w-full grid grid-rows-2 grid-cols-2 gap-1">
                                                <Image src={data.images[0].url}
                                                    alt="Asset Image"
                                                    width={1000}
                                                    height={1000}
                                                    className="object-cover w-full h-full aspect-square" />
                                                <Image src={data.images[1].url}
                                                    alt="Asset Image"
                                                    width={1000}
                                                    height={1000}
                                                    className="object-cover w-full h-full aspect-square" />
                                                <Image src={data.images[2].url}
                                                    alt="Asset Image"
                                                    width={1000}
                                                    height={1000}
                                                    className="object-cover w-full h-full aspect-square" />
                                                <Image src={data.images[3].url}
                                                    alt="Asset Image"
                                                    width={1000}
                                                    height={1000}
                                                    className="object-cover w-full h-full aspect-square" />
                                            </div>
                                        default:
                                            return <div className="w-full aspect-video grid grid-rows-2 grid-cols-2 gap-1">
                                                <Image src={data.images[0].url}
                                                    alt="Asset Image"
                                                    width={1000}
                                                    height={1000}
                                                    className="object-cover w-full h-full aspect-square" />
                                                <Image src={data.images[1].url}
                                                    alt="Asset Image"
                                                    width={1000}
                                                    height={1000}
                                                    className="object-cover w-full h-full aspect-square" />
                                                <Image src={data.images[2].url}
                                                    alt="Asset Image"
                                                    width={1000}
                                                    height={1000}
                                                    className="object-cover w-full h-full aspect-square" />
                                                <div className="relative w-full h-full aspect-square">
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                                        <h2 className="font-semibold text-4xl">+<span>{data.images.length - 3}</span></h2>
                                                    </div>
                                                    <Image src={data.images[3].url}
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

                    </div>
                </div>
                <div className='p-4 border rounded-lg flex justify-between bg-background shadow-md dark:bg-oupia-base'>
                    <div className="flex gap-2 items-center">
                        <Button variant={"normal"} onClick={() => handleVote(Vote.ACCEPT)} className="flex items-center gap-1.5">
                            <IoMdThumbsUp className='text-transparent fill-emerald-500 w-4 h-4' /> <span>Đồng ý</span>
                        </Button>
                        <Button variant={"normal"} onClick={() => handleVote(Vote.DENIED)} className="flex items-center gap-1.5">
                            <IoMdThumbsDown className='text-transparent fill-rose-500 w-4 h-4' /> Từ chối
                        </Button>
                        <VoteDialog landlordInfoId={data.landlordId} isOpen={isOpen} setIsOpen={setIsOpen} voteType={voteType} />
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
                                <DialogDescription className='w-3/4 truncate'>Xem thông tin chi tiết của "{data.assetName}"</DialogDescription>
                            </DialogHeader>
                            <Separator />
                            <ScrollArea className='h-[50vh]'>
                                <div className='flex flex-col gap-2'>
                                    <div>
                                        <h5 className='text-lg'>Mô tả, giới thiệu nhà trọ</h5>
                                        <p className={cn("text-muted-foreground text-sm", !textExpanded && "line-clamp-5")}>
                                            {data.assetDescription.split('\n').map((line, index) => (
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
                                                data.amenities?.map((amenity, index: number) => {
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
            </div>
        </>

    )
}

export default VoteItem