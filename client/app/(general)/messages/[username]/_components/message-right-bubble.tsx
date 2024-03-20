"use client";

import { Button } from '@/components/ui/button';
import { useMessageContext } from '@/contexts/message-context';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi';

function MessageRightBubble({ chat }: { chat: any }) {

    const { expanded } = useMessageContext();

    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <div className="flex gap-2.5 items-start w-fit ml-auto flex-row-reverse">
            <Image
                alt="User Avatar"
                src={"https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg"}
                width={500} height={500}
                className="w-8 aspect-square rounded-full" />
            <div className=" space-y-1">
                <div className="flex flex-row-reverse gap-2 items-center">
                    <h3 className="font-semibold">Võ Phú Phát</h3>
                    <h4 className="text-muted-foreground text-sm">11:38</h4>
                </div>
                <div className="flex flex-row-reverse gap-2 items-center" onMouseEnter={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}>
                    <p className={cn("bg-primary text-white py-3 px-5 rounded-2xl rounded-tr-none text-sm transition-all", expanded ? "max-w-lg" : "max-w-sm")}>That's awesome. I think our users will really appreciate the improvements. Continue to work!!</p>
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