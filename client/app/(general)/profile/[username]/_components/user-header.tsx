"use client"

import { User } from '@/interfaces/User';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import UserAvatar from './user-avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessagesSquare, UserRoundCheck } from 'lucide-react';

const UserHeader = () => {
    const params = useParams();
    const { username } = params;

    const [user, setUser] = useState<User>({
        name: "Võ Phú Phát",
        username: "phatvo",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
        phoneNumber: "09012345152"
    });

    return (
        <div className="flex flex-col">
            <div className="relative bg-border aspect-5/1 h-fit rounded-b-lg">
                <div className="absolute -bottom-[8rem] left-20">
                    <UserAvatar image={user.avatar} />
                </div>
            </div>
            <div className="flex items-center pl-80 py-10">
                <div className="w-full flex flex-col justify-between gap-1">
                    <h1 className="font-bold font-montserrat text-3xl">{user.name}</h1>
                    <Link href={`/profile/${username}/follows`} className="w-fit">
                        <h3 className="text-sm text-gray-600 dark:text-gray-400 hover:underline">126 người theo dõi</h3>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex w-full gap-2">
                        <Button variant={"ghost"} className="font-semibold bg-border/80 hover:bg-border text-base flex gap-x-2">
                            <UserRoundCheck size={16} />
                            <span>Theo dõi</span>
                        </Button>
                        <Button className="styled-button flex gap-x-2">
                            <MessagesSquare size={16} />
                            <span>Nhắn tin</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHeader;