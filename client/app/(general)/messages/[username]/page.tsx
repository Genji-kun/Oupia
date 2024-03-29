"use client"

import React, { useEffect } from 'react';
import UserHeaderBar from './_components/user-header-bar';
import { useMessageContext } from '@/contexts/message-context';
import MessageDetail from './_components/message-detail';
import MessageContainer from './_components/message-container';
import MessageInput from './_components/message-input';

const UserMessageRoomPage = () => {

    const { user, setUser, expanded } = useMessageContext();

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

        <div className="flex w-full h-full bg-background overflow-hidden dark:bg-oupia-base rounded-xl shadow-dark-theme shadow-light-theme">
            <div className={`w-full h-full flex flex-col relative min-h-[clac(100vh-80px)] lg:min-h-fit ${expanded && "border-r"}`}>
                <UserHeaderBar />
                <MessageContainer />
                <MessageInput />
            </div>
            <MessageDetail user={user} />
        </div>

    );
};
export default UserMessageRoomPage;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     