"use client";

import { Button } from '@/components/ui/button';
import { useMessageContext } from '@/contexts/message-context';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi';


function MessageRightBubble({ message, sender, isConsecutive }: { message: any, sender: any, isConsecutive: boolean }) {

    const { expanded } = useMessageContext();

    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <div className="flex gap-3 items-start w-fit ml-auto flex-row-reverse">
            <div className=" space-y-1">
                {!isConsecutive && <div className="flex flex-row-reverse gap-2 items-center">
                    <h3 className="font-semibold">{sender.fullName}</h3>
                </div>}
                {(() => {
                    switch (message.type) {
                        case "text":
                            return <>
                                <div className={cn("flex flex-row-reverse gap-2 items-center")} onMouseEnter={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}>
                                    <p className={cn("bg-primary text-white px-3 py-2 rounded-2xl rounded-tr-none text-sm transition-all", expanded ? "max-w-sm" : "max-w-lg")}>{message.content}</p>
                                    {isHover &&
                                        <Button variant={"ghost"} className="p-2 h-fit">
                                            <BiDotsHorizontalRounded className="w-4 h-4" />
                                        </Button>
                                    }
                                </div>
                            </>
                        case "image":
                            return <>
                                <div className={cn('grid gap-1', message.images.length > 3 ? "grid-cols-3" : `grid-cols-${message.images.length}`)}>
                                    {message.images && message.images.map((image: string, index: number) => (
                                        <div key={index} className=" relative">
                                            <Image width={500} height={500} className="rounded-lg object-cover w-24 aspect-square" src={image} alt={"Message Image"} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        default:
                            return <></>;
                    }
                })()}
            </div>

        </div>
    )
}

export default MessageRightBubble;