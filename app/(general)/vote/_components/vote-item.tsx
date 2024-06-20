import React, { useState } from 'react'
import VoteDialog from './vote-dialog'
import { Button } from '@/components/ui/button'
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io"
import { ILandlordInfo } from '@/lib/types/interfaces/User'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { convert } from '@/utils/convertAvatarAlt'

const VoteItem = ({ data }: { data: ILandlordInfo }) => {

    const [isOpen, setIsOpen] = useState(false);
    const handleVote = () => {
        setIsOpen(true);
    }

    return (
        <>
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
                    <h3 className="text-lg truncate text-primary">{data.assetName}</h3>
                    <p className="text-sm"><span className="line-clamp-3 text-muted-foreground">{data.assetDescription}</span><span>Xem thêm</span></p>
                </div>
            </div>
            <div className='py-4 px-6 border rounded-lg flex gap-2 bg-background shadow-md dark:bg-oupia-base'>
                <Button variant={"normal"} onClick={handleVote} className="flex items-center gap-1">
                    <IoMdThumbsUp className='text-transparent fill-emerald-500' /> <span>Đồng ý</span>
                </Button>
                <Button variant={"normal"} onClick={handleVote} className="flex items-center gap-1">
                    <IoMdThumbsDown className='text-transparent fill-rose-500' /> Từ chối
                </Button>
                <VoteDialog landlordInfoId={data.id} isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </>
    )
}

export default VoteItem