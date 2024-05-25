"use client"

import React, { useState } from 'react';
import { User } from '@/interfaces/User';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { convert } from '@/utils/convertAvatarAlt';
import { Timestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { format, formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const UserItem = ({ user, lastMessage }:
    {
        user: {
            fullName: string,
            username: string,
            avatar: string,
        },
        lastMessage: {
            content: string,
            createdAt: Timestamp,
            firstName: string,
            sender: string,
            type: string,
        }
    }) => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const pathname = usePathname();
    const isActive = pathname === `/messages/${user.username}`;

    return (
        <Link href={`/messages/${user.username}`} className="px-3 xl:px-5 w-fit">
            <div className={cn(" grid grid-cols-1 xl:grid-cols-7 items-center p-3 rounded-lg hover:bg-primary-200/50 dark:hover:bg-oupia-sub", isActive && "bg-primary-200/50 dark:bg-oupia-sub")}>
                <Avatar className='w-12 h-12'>
                    <AvatarImage src={user.avatar} alt={user.fullName} />
                    <AvatarFallback>{user.fullName && convert(user.fullName)}</AvatarFallback>
                </Avatar>
                <div className="ml-3 col-span-6 hidden xl:flex xl:flex-col justify-center">
                    <h2 className="font-semibold text-lg">{user.fullName}</h2>
                    <p className="text-sm text-muted-foreground flex gap-1"><span>{lastMessage.sender === currentUser?.username && "Bạn: "}</span> <span className="truncate">{lastMessage.type === "text" ? lastMessage.content : (lastMessage.type === "image" && "Đã gửi hình ảnh")}</span>·<span className="whitespace-nowrap">{lastMessage.createdAt && formatDistanceToNow(lastMessage.createdAt.toDate(), { addSuffix: true, locale: vi })}</span></p>
                </div>
            </div>
        </Link>
    );
};

export default UserItem;