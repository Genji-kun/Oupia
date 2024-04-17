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

function MessageLeftBubble({ message, sender, isConsecutive }: { message: any, sender: any, isConsecutive: boolean }) {

    const { expanded } = useMessageContext();

    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <div className="flex gap-3 items-start w-fit">
            {!isConsecutive && (
                <Avatar className='w-9 h-9'>
                    <AvatarImage src={sender.avatar} alt={sender.fullName} />
                    <AvatarFallback><span className="text-xs">{convert(sender.fullName)}</span></AvatarFallback>
                </Avatar>
            )}
            <div className="space-y-1">
                {!isConsecutive && (
                    <div className="justify-start flex gap-2 items-center">
                        <h3 className="font-semibold">{sender.fullName}</h3>
                    </div>
                )}
                <div className={cn("flex gap-2 items-center", isConsecutive && "ml-12")} onMouseEnter={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}>
                    <p className={cn("bg-gray-200/80 dark:bg-accent py-2 px-3 rounded-2xl rounded-tl-none transition-all", expanded ? "max-w-sm" : "max-w-lg")}>{message.content}</p>
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

export default MessageLeftBubble;