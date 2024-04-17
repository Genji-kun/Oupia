"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useMessageContext } from '@/contexts/message-context';
import { cn } from '@/lib/utils';
import { convert } from '@/utils/convertAvatarAlt';
import React, { useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi';

import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale'


function MessageRightBubble({ message, sender, isConsecutive }: { message: any, sender: any, isConsecutive: boolean }) {

    const { expanded } = useMessageContext();

    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <div className="flex gap-3 items-start w-fit ml-auto flex-row-reverse">
            {!isConsecutive && <Avatar className='w-8 h-8'>
                <AvatarImage src={sender.avatar} alt={sender.fullName} />
                <AvatarFallback><span className="text-xs">{convert(sender.fullName)}</span></AvatarFallback>
            </Avatar>}
            <div className=" space-y-1">
                {!isConsecutive && <div className="flex flex-row-reverse gap-2 items-center">
                    <h3 className="font-semibold">{sender.fullName}</h3>
                </div>}
                <div className={cn("flex flex-row-reverse gap-2 items-center", isConsecutive && "mr-12")} onMouseEnter={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}>
                    <p className={cn("bg-primary text-white px-3 py-2 rounded-2xl rounded-tr-none text-sm transition-all", expanded ? "max-w-sm" : "max-w-lg")}>{message.content}</p>
                    {isHover &&
                        <Button variant={"ghost"} className="p-2 h-fit">
                            <BiDotsHorizontalRounded className="w-4 h-4" />
                        </Button>
                    }
                </div>
            </div>

        </div>
    )
}

export default MessageRightBubble;