"use client"

import React, { useEffect } from 'react';
import UserHeaderBar from './_components/user-header-bar';
import { useMessageContext } from '@/contexts/message-context';
import MessageDetail from './_components/message-detail';
import MessageContainer from './_components/message-container';
import MessageInput from './_components/message-input';
import { notFound, useParams, useRouter } from 'next/navigation';
import { userEndpoints } from '@/configs/axiosEndpoints';
import { publicApi } from '@/configs/axiosInstance';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/configs/firebase';
import { useSelector } from 'react-redux';
import useRequireAuth from '@/hooks/use-require-auth';

const UserMessageRoomPage = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    let currUser = useRequireAuth(currentUser);
    const router = useRouter();

    const { setMessages, receiveUser, setReceiveUser, expanded } = useMessageContext();

    const params = useParams();
    const { username } = params;


    useEffect(() => {
        fetchUserInfo();
    }, [])

    useEffect(() => {
        const updateMessage = () => {
            const chatroomsRef = collection(db, 'chatrooms');
            const combinedUsername = [currUser.username, receiveUser.username].sort().join(':');
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
        if (currUser && receiveUser) {
            updateMessage();
            //   if (sessionStorage.getItem('postChat') !== null) {
            //     let postChatString = sessionStorage.getItem('postChat');
            //     let postChat: Post | null = postChatString ? JSON.parse(postChatString) : null;
            //     if (postChat && postChat.userId.id === receiverUser.id)
            //       sendPostMessage(postChat);
            //     sessionStorage.removeItem('postChat');
            //   }
        }
    }, [currUser, receiveUser])

    const fetchUserInfo = async () => {
        if (typeof (username) === "string") {
            try {
                const url = userEndpoints.getUserByUsername(username);
                const res = await publicApi.get(url);
                if (res.status === 200) {
                    setReceiveUser(res.data);
                } else {
                    notFound();
                }
            } catch (error) {
                notFound();

            }
        }
    }

    if (!currUser) {
        return <>{router.push("/sign-in")}</>
    }

    return (

        <div className="flex w-full h-full bg-background overflow-hidden dark:bg-oupia-base rounded-xl shadow-dark-theme shadow-light-theme">
            <div className={`w-full h-full flex flex-col relative min-h-[clac(100vh-80px)] lg:min-h-fit ${expanded && "border-r"}`}>
                <UserHeaderBar />
                <MessageContainer />
                <MessageInput />
            </div>
            {receiveUser && <MessageDetail />}
        </div>

    );
};
export default UserMessageRoomPage;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     