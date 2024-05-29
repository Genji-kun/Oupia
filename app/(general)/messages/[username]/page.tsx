"use client"

import React, { useEffect } from 'react';
import UserHeaderBar from './_components/user-header-bar';
import { useMessageContext } from '@/contexts/message-context';
import MessageDetail from './_components/message-detail';
import MessageContainer from './_components/message-container';
import MessageInput from './_components/message-input';
import { notFound, useRouter } from 'next/navigation';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/configs/firebase';
import { useSelector } from 'react-redux';
import { MessageToUserProvider } from '@/contexts/message-to-user-context';
import { NextPage } from 'next';

const UserMessageRoomPage: NextPage = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const { setMessages, userInfoData, expanded } = useMessageContext();


    useEffect(() => {
        const updateMessage = () => {
            const chatroomsRef = collection(db, 'chatrooms');
            const combinedUsername = [currentUser.username, userInfoData.username].sort().join(':');
            const q = query(chatroomsRef, where('roomId', '==', combinedUsername));
            getDocs(q).then((snapshot) => {
                const chatroom = snapshot.docs[0];
                if (chatroom) {
                    const messageRef = collection(chatroom.ref, "messages");
                    const q2 = query(messageRef, orderBy("createdAt"));
                    onSnapshot(q2, (snapshot) => {
                        setMessages(snapshot.docs.map((doc) => doc.data()));
                    })
                }
            });

        }
        if (currentUser && userInfoData) {
            updateMessage();
            //   if (sessionStorage.getItem('postChat') !== null) {
            //     let postChatString = sessionStorage.getItem('postChat');
            //     let postChat: Post | null = postChatString ? JSON.parse(postChatString) : null;
            //     if (postChat && postChat.userId.id === receiverUser.id)
            //       sendPostMessage(postChat);
            //     sessionStorage.removeItem('postChat');
            //   }
        }
    }, [currentUser, userInfoData, setMessages]);

    return (
        <MessageToUserProvider>
            <div className="flex w-full h-full bg-background overflow-hidden dark:bg-oupia-base rounded-xl shadow-dark-theme shadow-light-theme">
                <div className={`w-full h-full flex flex-col relative min-h-[clac(100vh-80px)] lg:min-h-fit ${expanded && "border-r"}`}>
                    <UserHeaderBar />
                    <MessageContainer />
                    <MessageInput />
                </div>
                {userInfoData && <MessageDetail />}
            </div>
        </MessageToUserProvider>
    );
};
export default UserMessageRoomPage;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     