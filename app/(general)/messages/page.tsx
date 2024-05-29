"use client"

import { MessageSquareOff } from 'lucide-react';
import { NextPage } from 'next';
import React from 'react';

const MessagesPage: NextPage = () => {

    return (
        <div className="h-full w-full flex flex-col gap-5 items-center justify-center">
            <MessageSquareOff size="56" className="text-muted-foreground" />
            <h1 className="font-semibold text-xl text-muted-foreground">Chưa chọn đoạn chat nào, hãy chọn người dùng để trò chuyện</h1>
        </div>
    );
};

export default MessagesPage;