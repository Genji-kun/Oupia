import React, { useState } from 'react'
import VoteDialog from './vote-dialog'
import { Button } from '@/components/ui/button'
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io"
import { ILandlordInfo } from '@/lib/types/interfaces/User'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { convert } from '@/utils/convertAvatarAlt'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Vote } from '@/lib/types/enums'

const VoteItem = ({ data, isVerified }: { data: ILandlordInfo, isVerified: boolean }) => {

    const [isOpen, setIsOpen] = useState(false);
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
                    <h5>Ngày đăng: <span className="text-muted-foreground">{format(data.createdAt, "dd-MM-yyyy",)}</span>
                    </h5>
                </div>
            </div>
            <div className='space-y-2'>
                <div className='py-4 px-6 border rounded-lg flex flex-col gap-4 bg-background shadow-md dark:bg-oupia-base'>
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
                    <div className="space-y-2">
                        <h3 className="">Mô tả, giới thiệu về nhà trọ</h3>
                        <p className={cn("text-muted-foreground", !textExpanded && "line-clamp-5")}>
                            {data.assetDescription.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </p>
                        <span className="cursor-pointer" onClick={() => setTextExpanded((prev) => !prev)}>{textExpanded ? "Ẩn bớt" : "Xem thêm"}</span>
                    </div>
                </div>

                {
                    isVerified && <div className='py-4 px-6 border rounded-lg flex gap-2 bg-background shadow-md dark:bg-oupia-base'>
                        <Button variant={"normal"} onClick={() => handleVote(Vote.ACCEPT)} className="flex items-center gap-1.5">
                            <IoMdThumbsUp className='text-transparent fill-emerald-500 w-4 h-4' /> <span>Đồng ý</span>
                        </Button>
                        <Button variant={"normal"} onClick={() => handleVote(Vote.DENIED)} className="flex items-center gap-1.5">
                            <IoMdThumbsDown className='text-transparent fill-rose-500 w-4 h-4' /> Từ chối
                        </Button>
                        <VoteDialog landlordInfoId={data.landlordId} isOpen={isOpen} setIsOpen={setIsOpen} voteType={voteType} />
                    </div>
                }

            </div>
        </>

    )
}

export default VoteItem