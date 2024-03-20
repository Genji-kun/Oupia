"use client"

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useMessageContext } from '@/contexts/message-context';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const UserHeaderBar = () => {

    const { user, expanded, setExpanded } = useMessageContext();

    return (
        <div className="p-2 w-full flex justify-between items-center">
            <Link href={`/profile/${user.account?.username}`} className=" rounded-lg p-2 pr-6 hover:bg-border/50 dark:hover:bg-componentForeground">
                <div className="flex gap-x-4 items-center">
                    <Image
                        src={user.avatar}
                        height={500}
                        width={500}
                        alt={"User Avatar"}
                        className="object-cover rounded-full w-12 aspect-square"></Image>
                    <div>
                        <h2 className="font-semibold text-lg leading-none">{user.fullName}</h2>
                        {/* <span className="text-lime-500 text-sm leading-none">Đang hoạt động</span> */}
                    </div>
                </div>
            </Link>
            <div className="flex items-center gap-x-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            {expanded ?
                                <Button onClick={() => { setExpanded(false) }} variant={"ghost"} className="px-2.5">
                                    <PanelRightClose className="w-6 h-6" />
                                </Button> :
                                <Button onClick={() => { setExpanded(true) }} variant={"ghost"} className="px-2.5">
                                    <PanelRightOpen className="w-6 h-6" />
                                </Button>
                            }
                        </TooltipTrigger>
                        <TooltipContent className="dark:bg-componentBackground">
                            <p>Thông tin cuộc trò chuyện</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div >
    );
};

export default UserHeaderBar;