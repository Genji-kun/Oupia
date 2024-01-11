import React from 'react';
import UserTab from './user-tab';
import UserHeader from './user-header';
import { Separator } from '@/components/ui/separator';

const UserProfile = () => {
    return (
        <div className="container flex flex-col">
            <UserHeader />
            <Separator />
            <UserTab />
        </div>
    );
};

export default UserProfile;