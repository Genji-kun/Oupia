"use client"

import React, { useEffect, useRef } from 'react'
import MessageLeftBubble from './message-left-bubble';
import MessageRightBubble from './message-right-bubble';
import { useMessageContext } from '@/contexts/message-context';
import { useSelector } from 'react-redux';
import voice from "@/public/sounds/message.mp3";
import { useRouter } from 'next/navigation';
import { format, isToday, isYesterday } from 'date-fns';
import { Separator } from '@/components/ui/separator';

const MessageContainer: React.FC = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const router = useRouter();

    const { userInfoData, messages } = useMessageContext();

    const intervalId = useRef<any>();

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
            const lastMessage = messages[messages.length - 1];
            onNewMessage(lastMessage);
        }

        const handleFocus = () => {
            clearInterval(intervalId.current);
            document.title = 'Nhắn tin | Oupia';
        }

        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        }
    }, [messages]);

    const onNewMessage = (message: any) => {
        if (message.sender !== currentUser.username && !document.hasFocus()) {
            const sound = new Audio(voice);
            sound.play();

            const newTitle = `${message.firstName} đã nhắn tin cho bạn`;
            intervalId.current = setInterval(() => flashTitle("Nhắn tin | Oupia", newTitle), 1500);
        }
    }

    const flashTitle = (title: string, announce: string) => {
        if (document.title == title) {
            console.log(document.title)
            document.title = announce;
        } else {
            document.title = title;
        }
    }

    const botttomRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        botttomRef.current?.scrollIntoView({ behavior: "instant" })
    }

    const formatMessageTime = (date: Date) => {
        const timeFormat = "HH:mm";
        if (isToday(date)) {
            return format(date, timeFormat);
        } else if (isYesterday(date)) {
            return `Hôm qua ${format(date, timeFormat)}`;
        } else {
            const daysOfWeek = ['CN', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7'];
            const dayOfWeek = daysOfWeek[date.getDay()];
            return `${dayOfWeek} ${format(date, timeFormat)}`;
        }
    };


    if (!currentUser) {
        return <>{router.push("/sign-in")}</>
    }

    return (
        <div className="overflow-y-auto flex-grow">
            <div className="pb-0 p-4 flex flex-col gap-1 dark:bg-oupia-base">
                <>
                    {
                        messages.length > 0 && messages.map((message, index) => {
                            const isConsecutive = index > 0 && messages[index - 1].sender === message.sender;
                            const isTenMinuteLong = index > 0 && (message.createdAt && message.createdAt.toDate().getTime() - messages[index - 1].createdAt.toDate().getTime()) > 10 * 60 * 1000;
                            return <React.Fragment key={index}>
                                {isTenMinuteLong && <div className="flex gap-2 items-center justify-center w-full py-2">
                                    <Separator className="w-1/3" />
                                    <span className="text-sm text-muted-foreground">{formatMessageTime(message.createdAt && message.createdAt.toDate())} </span>
                                    <Separator className="w-1/3" />
                                </div>}

                                {
                                    message.sender === currentUser.username ?
                                        <MessageRightBubble message={message} sender={currentUser} isConsecutive={isConsecutive} />
                                        : <MessageLeftBubble message={message} sender={userInfoData} isConsecutive={isConsecutive} />
                                }

                            </React.Fragment>
                        })
                    }
                </>
            </div>
            <div ref={botttomRef} />
        </div>
    )
}

export default MessageContainer;