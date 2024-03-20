"use client"

import { Skeleton } from '@/components/ui/skeleton';
import React, { use } from 'react';
import UserFilterBar from './user-filter-bar';
import { User } from '@/interfaces/User';
import Image from 'next/image';
import UserItem from './user-item';

const UsersList = () => {

    const user: User = {
        fullName: "Võ Phú Phát",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1696484302/z8ch1cp7vfkdrcxgfbai.jpg",
        account: {
            username: "phatvo"
        },
        phoneNumber: "0987654321"
    };

    const user2: User = {
        fullName: "Võ Phú Phát",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1696484302/z8ch1cp7vfkdrcxgfbai.jpg",
        account: {
            username: "phatvo123"
        },
        phoneNumber: "0987654321"
    };

    return (
        <div className="flex flex-col w-fit xl:w-full min-h-[clac(100vh-80px)] lg:min-h-fit  h-full pb-3 xl:pb-5 bg-background dark:bg-componentBackground rounded-xl shadow-lg dark:shadow-black/25">
            {/* <UserFilterBar /> */}
            {/* <div className="flex items-center space-x-4">
                <Skeleton className="bg-muted-foreground/25 object-cover w-14 rounded-full" />
                <div className="space-y-1">
                    <Skeleton className="bg-muted-foreground/25 h-4 w-[250px]" />
                    <Skeleton className="bg-muted-foreground/25 h-4 w-[200px]" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Skeleton className="bg-muted-foreground/25 object-cover w-14 rounded-full" />
                <div className="space-y-1">
                    <Skeleton className="bg-muted-foreground/25 h-4 w-[150px]" />
                    <Skeleton className="bg-muted-foreground/25 h-4 w-[100px]" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Skeleton className="bg-muted-foreground/25 object-cover w-14 rounded-full" />
                <div className="space-y-1">
                    <Skeleton className="bg-muted-foreground/25 h-4 w-[250px]" />
                    <Skeleton className="bg-muted-foreground/25 h-4 w-[150px]" />
                </div>
            </div> */}
            <div className="flex flex-col gap-2">
                <UserItem user={user} />
                <UserItem user={user2} />
                <UserItem user={user2} />
                <UserItem user={user2} />
            </div>

        </div>
    );
};

export default UsersList;