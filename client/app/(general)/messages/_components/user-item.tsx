"use client"

import React, { useState } from 'react';
import { User } from '@/interfaces/User';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const UserItem = ({ user }: { user: User }) => {

    const pathname = usePathname();
    const isActive = pathname === `/messages/${user.account?.username}`;


    return (
        <Link href={`/messages/${user.account?.username}`} className="px-5">
            <div className={cn("flex items-center space-x-4 px-5 py-3 rounded-lg hover:bg-primary-200/50 dark:hover:bg-slate-800", isActive && "bg-primary-200/50 dark:bg-slate-800 ")}>
                <Image height={500} width={500}
                    src={user.avatar}
                    alt={"user image"}
                    className="aspect-square w-14 object-cover rounded-full" />
                <div className="truncate">
                    <h2 className="font-semibold">{user.fullName}</h2>
                    <p className=" truncate text-sm text-muted-foreground" >Hello bạn, còn nhà trọ nào ở khu vực Bình Chánh không á? Tôi muốn thuê trọ</p>
                </div>
            </div>
        </Link>
    );
};

export default UserItem;