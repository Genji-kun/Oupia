"use client"

import { useProfileContext } from '@/contexts/profile-context';
import React from 'react';
import FollowerList from './_components/follower-list';
import dynamic from 'next/dynamic';

const FollowsProfilePage = () => {

    const { userInfoData } = useProfileContext();
    const names = userInfoData?.fullName.split(" ");

    return (
        <div className="flex flex-col gap-4 container">
            <h2 className="font-semibold text-xl"><span className="text-muted-foreground">Những người dùng theo dõi</span> {names && names[names?.length - 1]}</h2>
            <FollowerList />
        </div>
    );
};

export default dynamic(() => Promise.resolve(FollowsProfilePage), { ssr: false })
