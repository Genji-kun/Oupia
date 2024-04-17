"use client"

import { notFound, useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessagesSquare, UserRoundCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { convert } from '@/utils/convertAvatarAlt';
import { userEndpoints } from '@/configs/axiosEndpoints';
import { publicApi } from '@/configs/axiosInstance';
import { useProfileContext } from '@/contexts/profile-context';
import UserHeaderButtons from './user-header-buttons';

const UserHeader = () => {

    const router = useRouter();
    const params = useParams();
    const { username } = params;

    const { userInfo, setUserInfo } = useProfileContext();

    useEffect(() => {
        fetchUserInfo();
    }, [])

    const fetchUserInfo = async () => {
        if (typeof (username) === "string") {
            try {
                const url = userEndpoints.getUserByUsername(username);
                const res = await publicApi.get(url);
                if (res.status === 200) {
                    setUserInfo(res.data);
                } else {
                    // notFound();
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="flex flex-col">
            <div className="relative bg-border dark:bg-oupia-sub aspect-[3/1] lg:aspect-[4/1] xl:aspect-[8/1] rounded-b-lg">
                {
                    userInfo ?
                        <>
                            <div className="absolute -bottom-[6rem] xl:-bottom-[8rem] left-1/2 -translate-x-1/2 2xl:left-20  2xl:translate-x-0">
                                <Avatar className='w-40 h-40 border-4 border-background'>
                                    <AvatarImage src={userInfo.avatar} alt={userInfo.fullName} />
                                    <AvatarFallback className="text-3xl font-semibold">{userInfo.fullName && convert(userInfo.fullName)}</AvatarFallback>
                                </Avatar>
                            </div>
                        </>
                        :
                        <>
                            <div className="absolute -bottom-[8rem] left-1/2 -translate-x-1/2 xl:left-20 xl:translate-x-0">
                                <div className='w-40 aspect-square rounded-full border-4 border-background bg-border dark:bg-oupia-sub'>
                                </div>
                            </div>
                        </>
                }
            </div>
            <div className="flex flex-col xl:flex-row xl:justify-between items-center xl:pl-80 pt-[6.5rem] xl:pt-10 pb-5 xl:pb-10">
                {
                    userInfo ?
                        <>
                            <div className="w-full flex flex-col justify-between gap-2 items-center xl:items-start pb-5">
                                <h1 className="font-bold text-3xl leading-0">{userInfo.fullName}</h1>
                                <Link href={`/profile/${userInfo.username}/follows`} className="w-fit">
                                    <h3 className="text-muted-foreground hover:underline">{userInfo.totalFollower} người theo dõi</h3>
                                </Link>
                            </div>
                            <UserHeaderButtons />
                        </>
                        :
                        <>
                            <div className="w-full flex flex-col justify-between gap-2">
                                <div className="bg-border dark:bg-oupia-sub py-5 w-72 animate-pulse rounded-full"></div>
                                <div className="bg-border dark:bg-oupia-sub p-3 w-40 animate-pulse rounded-full"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex w-full gap-2">
                                    <div className="bg-border dark:bg-oupia-sub px-16 py-4 animate-pulse rounded"></div>
                                    <div className="bg-border dark:bg-oupia-sub px-16 py-4 animate-pulse rounded"></div>
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default UserHeader;