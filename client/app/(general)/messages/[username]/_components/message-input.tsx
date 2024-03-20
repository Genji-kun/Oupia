"use client"

import { useMessageContext } from '@/contexts/message-context';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ImageIcon, Link, Smile, StickyNote } from 'lucide-react';
import { HiOutlineHomeModern } from "react-icons/hi2";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { useTheme } from 'next-themes';

const MessageInput = () => {

    const { expanded } = useMessageContext();
    const { theme } = useTheme();

    // Message State
    const [message, setMessage] = useState('');

    const handleEmojiSelect = (emoji: any) => {
        setMessage(prevMessage => prevMessage + emoji.native);
    }

    const sendMessage = (evt: any) => {
        evt.preventDefault();
        console.log(message);
        setMessage("");
    }


    return (
        <div className={`${expanded ? "rounded-b-xl" : "rounded-bl-xl"} bg-background dark:bg-componentBackground w-full`}>
            <div className="flex gap-2 items-center py-4 px-2">
                <Popover>
                    <PopoverTrigger>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant={"ghost"} className="items-center rounded-full p-2 h-fit text-muted-foreground">
                                        <BiSolidMessageSquareAdd className="w-6 h-6" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent align='start' className="mb-0.5">
                                    <p>Thêm một đính kèm</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </PopoverTrigger>
                    <PopoverContent side='top' align='start' className="mb-1 flex flex-col p-2 w-[200px]">
                        <div className="flex gap-x-2 items-center text-sm hover:bg-accent p-2 cursor-pointer rounded">
                            <ImageIcon className="w-4 h-4" />
                            <span>Hình ảnh</span>
                        </div>
                        <div className="flex gap-x-2 items-center text-sm hover:bg-accent p-2 cursor-pointer rounded">
                            <HiOutlineHomeModern className="w-4 h-4" />
                            <span>Thông tin căn hộ</span>
                        </div>
                        <div className="flex gap-x-2 items-center text-sm hover:bg-accent p-2 cursor-pointer rounded">
                            <StickyNote className="w-4 h-4" />
                            <span>Bài viết</span>
                        </div>
                        <div className="flex gap-x-2 items-center text-sm hover:bg-accent p-2 cursor-pointer rounded">
                            <Link className="w-4 h-4" />
                            <span>Đường dẫn</span>
                        </div>
                    </PopoverContent>
                </Popover>
                <div className="relative w-full">
                    <form className="flex gap-2 flex-grow" onSubmit={(e) => { sendMessage(e) }}>
                        <Input
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder='Nhập nội dung tin nhắn...'
                            className="dark:bg-componentForeground dark:border-none enabled:focus:ring-0 p-4 pr-10 " />
                        <TooltipProvider>

                            <Tooltip>
                                <TooltipTrigger>
                                    <Button type="submit" className="styled-button px-3 items-center ">
                                        <svg className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24">
                                            <path d="M23.119.882a2.966,2.966,0,0,0-2.8-.8l-16,3.37a4.995,4.995,0,0,0-2.853,8.481L3.184,13.65a1,1,0,0,1,.293.708v3.168a2.965,2.965,0,0,0,.3,1.285l-.008.007.026.026A3,3,0,0,0,5.157,20.2l.026.026.007-.008a2.965,2.965,0,0,0,1.285.3H9.643a1,1,0,0,1,.707.292l1.717,1.717A4.963,4.963,0,0,0,15.587,24a5.049,5.049,0,0,0,1.605-.264,4.933,4.933,0,0,0,3.344-3.986L23.911,3.715A2.975,2.975,0,0,0,23.119.882ZM4.6,12.238,2.881,10.521a2.94,2.94,0,0,1-.722-3.074,2.978,2.978,0,0,1,2.5-2.026L20.5,2.086,5.475,17.113V14.358A2.978,2.978,0,0,0,4.6,12.238Zm13.971,7.17a3,3,0,0,1-5.089,1.712L11.762,19.4a2.978,2.978,0,0,0-2.119-.878H6.888L21.915,3.5Z" />
                                        </svg>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent align='end' className="mb-0.5">
                                    <p>Gửi tin nhắn</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </form>
                    <Popover>
                        <PopoverTrigger className="absolute right-[3.25rem] top-1/2 -translate-y-1/2">
                            <TooltipProvider>

                                <Tooltip>
                                    <TooltipTrigger >
                                        <Button type="button" variant={"ghost"} className="rounded-full p-2 h-fit text-foreground bg-background dark:bg-componentForeground">
                                            <Smile className="w-5 h-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent align='end' className="mb-0.5">
                                        <p>Chọn biểu tượng cảm xúc</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </PopoverTrigger>
                        <PopoverContent side='top' align='end' className="mb-1 p-0 border-none shadow-none relative">
                            <div className="shadow-lg w-fit rounded-xl absolute right-0 bottom-0" >
                                <Picker data={data} theme={theme && theme} onEmojiSelect={handleEmojiSelect} />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div >
    );
};

export default MessageInput;