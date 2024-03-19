"use client"

import React, { useEffect } from 'react';
import UserHeaderBar from './_components/user-header-bar';
import { useMessageContext } from '@/contexts/message-context';
import MessageDetail from './_components/message-detail';
import ChatInput from './_components/chat-input';

const UserMessageRoomPage = () => {

    const { user, setUser } = useMessageContext();

    useEffect(() => {
        setUser({
            fullName: "Võ Phú Phát",
            avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1696484302/z8ch1cp7vfkdrcxgfbai.jpg",
            account: {
                username: "phatvo"
            },
            roles: ["ROLE_LANDLORD"],
            phoneNumber: "0987654321"
        })
    }, [setUser])

    return (

        <div className="flex w-full h-full bg-background dark:bg-componentBackground rounded-xl shadow-lg dark:shadow-black/25">
            <div className="w-full h-full flex flex-col relative min-h-[clac(100vh-80px)] lg:min-h-fit">
                <UserHeaderBar />
                <ChatInput />
            </div>
            <MessageDetail user={user} />
        </div>

    );
};
export default UserMessageRoomPage;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     