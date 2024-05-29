"use client"

import { useParams } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { convert } from '@/utils/convertAvatarAlt';
import { useProfileContext } from '@/contexts/profile-context';
import UserHeaderButtons from './user-header-buttons';
import { Skeleton } from '@/components/ui/skeleton';

const UserHeader = () => {

    const { userInfoData } = useProfileContext();

    return (
        <div className="flex flex-col">
            <div className="relative bg-border dark:bg-oupia-base aspect-[3/1] lg:aspect-[4/1] xl:aspect-[8/1] rounded-b-lg">
                {
                    userInfoData ?
                        <>
                            <div className="absolute -bottom-[6rem] xl:-bottom-[8rem] left-1/2 -translate-x-1/2 2xl:left-20  2xl:translate-x-0">
                                <Avatar className='w-40 h-40 border-4 border-background'>
                                    <AvatarImage src={userInfoData.avatar} alt={userInfoData.fullName} />
                                    <AvatarFallback className="text-3xl font-semibold">{userInfoData.fullName && convert(userInfoData.fullName)}</AvatarFallback>
                                </Avatar>
                            </div>
                        </>
                        :
                        <>
                            <div className="absolute -bottom-[8rem] left-1/2 -translate-x-1/2 xl:left-20 xl:translate-x-0">
                                <Skeleton className='w-40 aspect-square rounded-full border-4 border-background bg-border dark:bg-oupia-base' />
                            </div>
                        </>
                }
            </div>
            <div className="flex flex-col xl:flex-row xl:justify-between items-center xl:pl-80 pt-[6.5rem] xl:pt-10 pb-5 xl:pb-10">
                {
                    userInfoData ?
                        <>
                            <div className="w-full flex flex-col justify-between gap-2 items-center xl:items-start pb-5">
                                <h1 className="font-bold text-3xl leading-0">{userInfoData.fullName}</h1>
                                <Link href={`/profile/${userInfoData.username}/follows`} className="w-fit">
                                    <h3 className="text-muted-foreground hover:underline">{userInfoData.totalFollower} người theo dõi</h3>
                                </Link>
                            </div>
                            <UserHeaderButtons />
                        </>
                        :
                        <>
                            <div className="w-full flex flex-col justify-between gap-2">
                                <Skeleton className="bg-border dark:bg-oupia-base h-10 w-72" />
                                <Skeleton className="bg-border dark:bg-oupia-base h-5 w-40" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex w-full gap-2">
                                    <Skeleton className="bg-border dark:bg-oupia-base h-10 w-32" />
                                    <Skeleton className="bg-border dark:bg-oupia-base h-10 w-32" />
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default UserHeader;