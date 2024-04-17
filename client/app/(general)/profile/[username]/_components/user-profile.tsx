"use client"

import React from 'react';
import UserTab from './user-tab';
import UserHeader from './user-header';
import { Separator } from '@/components/ui/separator';
import { useProfileContext } from '@/contexts/profile-context';

const UserProfile = () => {

    const { userInfo } = useProfileContext();

    return (
        <div className="container flex flex-col">
            <UserHeader />
            <Separator />
            {userInfo && <UserTab />}
        </div>
    );
};

export default UserProfile;