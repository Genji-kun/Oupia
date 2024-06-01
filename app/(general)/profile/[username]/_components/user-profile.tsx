"use client"

import React from 'react';
import UserHeader from './user-header';
import { Separator } from '@/components/ui/separator';
import { useProfileContext } from '@/contexts/profile-context';

const UserProfile = () => {

    const { userInfoData } = useProfileContext();

    return (
        <div className="container flex flex-col">
            <UserHeader />
            <Separator />
            {/* {userInfoData && <UserTab />} */}
        </div>
    );
};

export default UserProfile;