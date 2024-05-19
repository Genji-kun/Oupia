"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useMessageContext } from '@/contexts/message-context';
import { convert } from '@/utils/convertAvatarAlt';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


const UserHeaderBar : React.FC= () => {

    const { receiveUser, expanded, setExpanded } = useMessageContext();

    return (
        <div className="p-2 w-full flex justify-between items-center shadow dark:shadow-black/20 z-20">

            {
                receiveUser ?
                    <>
                        <Link href={`/profile/${receiveUser.username}`} className=" border-2 border-transparent rounded-lg p-2 pr-6 hover:bg-gray-100 dark:hover:bg-oupia-bg dark:hover:bg-background dark:hover:border-oupia-sub">
                            <div className="flex gap-x-4 items-center">
                                <Avatar className='w-12 h-12'>
                                    <AvatarImage src={receiveUser.avatar} alt={receiveUser.fullName} />
                                    <AvatarFallback className="font-semibold">{receiveUser.fullName && convert(receiveUser.fullName)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="font-semibold text-lg leading-none">{receiveUser.fullName && receiveUser.fullName}</h2>
                                    {/* <span className="text-lime-500 text-sm leading-none">Đang hoạt động</span> */}
                                </div>
                            </div>
                        </Link>
                    </>
                    :
                    <>
                        <div className=" rounded-lg p-2 pr-6">
                            <div className="flex gap-x-4 items-center">
                                <div className='w-12 aspect-square rounded-full bg-border dark:bg-oupia-sub animate-pulse'>
                                </div>
                                <div className="space-y-1">
                                    <div className="w-40 p-2 rounded-full  bg-border dark:bg-oupia-sub animate-pulse"></div>
                                    <div className="w-20 p-2 rounded-full  bg-border dark:bg-oupia-sub animate-pulse"></div>
                                </div>
                            </div>

                        </div>
                    </>
            }

            <div className="flex items-center gap-x-2 mr-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            {expanded ?
                                <Button onClick={() => { setExpanded(false) }} variant={"ghost"} className="px-2.5 text-primary hover:text-primary">
                                    <PanelRightClose className="w-6 h-6" />
                                </Button> :
                                <Button onClick={() => { setExpanded(true) }} variant={"ghost"} className="px-2.5">
                                    <PanelRightOpen className="w-6 h-6" />
                                </Button>
                            }
                        </TooltipTrigger>
                        <TooltipContent className="dark:bg-oupia-base">
                            <p>Thông tin cuộc trò chuyện</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div >
    );
};

export default UserHeaderBar;