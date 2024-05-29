"use client"

import React from 'react';
import UserIntroduce from './_components/user-introduce';
import SuggestUserList from './_components/suggest-user-list';
import { ForumProvider } from '@/contexts/forum-context';
import UserPostList from './_components/user-post-list';
import { NextPage } from 'next';

const ProfilePage: NextPage = () => {


    return (
        <div className="container h-full grid grid-cols-7 gap-4">
            <div className="col-span-2">
                <UserIntroduce />
            </div>
            <div className="col-span-3">
                <ForumProvider>
                    <UserPostList />
                </ForumProvider>
            </div>
            <div className="col-span-2">
                <SuggestUserList />
            </div>
        </div>
    );
};

export default ProfilePage;