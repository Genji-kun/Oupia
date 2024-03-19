"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMessageContext } from '@/contexts/message-context';
import { Smile } from 'lucide-react';
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ChatInput = () => {

    const { expanded } = useMessageContext();

    return (

        <TooltipProvider>
            <div className={`${expanded ? "rounded-b-xl" : "rounded-bl-xl"} bg-background dark:bg-componentBackground absolute bottom-0 w-full`}>
                <div className="flex gap-2 items-center p-5">

                    <Tooltip>
                        <TooltipTrigger>
                            <Button variant={"ghost"} className="items-center rounded-full p-2 h-fit text-muted-foreground">
                                <BiSolidMessageSquareAdd className="w-6 h-6" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="mb-0.5">
                            <p>Thêm một đính kèm</p>
                        </TooltipContent>
                    </Tooltip>
                    <div className="relative w-full">
                        <Input
                            placeholder='Nhập nội dung tin nhắn...'
                            className="dark:bg-componentForeground dark:border-none enabled:focus:ring-0 p-4 pr-10 " />
                        <Tooltip>
                            <TooltipTrigger className="absolute right-1 top-1/2 -translate-y-1/2">
                                <Button variant={"ghost"} className="rounded-full p-2 h-fit text-foreground bg-background dark:bg-componentForeground">
                                    <Smile className="w-5 h-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="mb-0.5">
                                <p>Chọn biểu tượng cảm xúc</p>
                            </TooltipContent>
                        </Tooltip>

                    </div>
                    <div className="flex gap-2">
                        <Tooltip>
                            <TooltipTrigger>
                                <Button className="styled-button px-3 items-center ">
                                    <svg className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24">
                                        <path d="M23.119.882a2.966,2.966,0,0,0-2.8-.8l-16,3.37a4.995,4.995,0,0,0-2.853,8.481L3.184,13.65a1,1,0,0,1,.293.708v3.168a2.965,2.965,0,0,0,.3,1.285l-.008.007.026.026A3,3,0,0,0,5.157,20.2l.026.026.007-.008a2.965,2.965,0,0,0,1.285.3H9.643a1,1,0,0,1,.707.292l1.717,1.717A4.963,4.963,0,0,0,15.587,24a5.049,5.049,0,0,0,1.605-.264,4.933,4.933,0,0,0,3.344-3.986L23.911,3.715A2.975,2.975,0,0,0,23.119.882ZM4.6,12.238,2.881,10.521a2.94,2.94,0,0,1-.722-3.074,2.978,2.978,0,0,1,2.5-2.026L20.5,2.086,5.475,17.113V14.358A2.978,2.978,0,0,0,4.6,12.238Zm13.971,7.17a3,3,0,0,1-5.089,1.712L11.762,19.4a2.978,2.978,0,0,0-2.119-.878H6.888L21.915,3.5Z" />
                                    </svg>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="mb-0.5">
                                <p>Gửi tin nhắn</p>
                            </TooltipContent>
                        </Tooltip>

                    </div>
                </div>
            </div >
        </TooltipProvider>

    );
};

export default ChatInput;