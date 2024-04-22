"use client"

import useRequireAuth from '@/hooks/use-require-auth';
import { MessageSquareOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

const MessagesPage = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const router = useRouter();

    let currUser = useRequireAuth(currentUser);

    if (!currUser) {
        return <>{router.push("/sign-in")}</>
    }

    return (
        <div className="h-full w-full flex flex-col gap-5 items-center justify-center">
            <MessageSquareOff size="56" className="text-muted-foreground" />
            <h1 className="font-semibold text-xl text-muted-foreground">Chưa chọn đoạn chat nào, hãy chọn người dùng để trò chuyện</h1>
        </div>
    );
};

export default MessagesPage;