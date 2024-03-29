"use client";

import { Button } from '@/components/ui/button';
import { useMessageContext } from '@/contexts/message-context';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi';

function MessageLeftBubble({ chat }: { chat: any }) {

    const { expanded } = useMessageContext();

    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <div className="flex gap-2.5 items-start w-fit">
            <Image
                alt="User Avatar"
                src={"https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg"}
                width={500} height={500}
                className="w-8 aspect-square rounded-full" />
            <div className="space-y-1">
                <div className="flex gap-2 items-center text-sm">
                    <h3 className="font-semibold">Võ Phú Phát</h3>
                    <h4 className="text-muted-foreground">11:38</h4>
                </div>
                <div className="flex gap-2 items-center" onMouseEnter={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}>
                    <p className={cn("bg-gray-200/80 dark:bg-accent py-2 px-3 rounded-2xl rounded-tl-none transition-all", expanded ? "max-w-sm" : "max-w-lg")}>I think our users will really appreciate the improvements.</p>
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