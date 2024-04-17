"use client"

import React, { useEffect, useState } from 'react';
import UserFilterBar from './user-filter-bar';

import UserItem from './user-item';
import { useSelector } from 'react-redux';
import { authApi } from '@/configs/axiosInstance';
import { authEndpoints } from '@/configs/axiosEndpoints';
import { signInWithCustomToken } from 'firebase/auth';
import { auth, db } from '@/configs/firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import useRequireAuth from '@/hooks/use-require-auth';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

const UsersList = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const router = useRouter();

    const [authToken, setAuthToken] = useState<string>();
    const [chatRooms, setChatRooms] = useState<any[] | undefined>();


    useEffect(() => {
        if (!currentUser) {
            router.push("/sign-in?next=/messages");
        }
    }, [currentUser, router]);

    useEffect(() => {
        const getFbToken = async () => {
            try {
                const res = await authApi.get(authEndpoints["getAuthToken"], {
                    params: {
                        username: currentUser.username
                    }
                });
                if (res.status === 200) {
                    setAuthToken(res.data);
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (currentUser) {
            getFbToken();
        }
    }, [currentUser])

    useEffect(() => {
        if (authToken && currentUser) {
            signInWithCustomToken(auth, authToken);
            const chatroomsRef = collection(db, 'chatrooms');
            const q = query(chatroomsRef, where('members', 'array-contains', currentUser.username), orderBy("updatedAt", "desc"));
            onSnapshot(q, (snapshot: any) => {
                setChatRooms(snapshot.docs.map((doc: any) => doc.data()));
            });
        }
    }, [authToken, currentUser]);

    if (!currentUser) {
        return <>{router.push("/sign-in")}</>
    }

    return (
        <div className="flex flex-col w-full xl:w-full min-h-[clac(100vh-80px)] lg:min-h-fit h-full pb-3 xl:pb-5 bg-background dark:bg-oupia-base rounded-xl shadow-dark-theme shadow-light-theme">
            <UserFilterBar />
            {
                !chatRooms &&
                <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2 py-2 px-8">
                        <Skeleton className="bg-border dark:bg-oupia-sub object-cover w-12 aspect-square rounded-full" />
                        <div className="space-y-1">
                            <Skeleton className="bg-border dark:bg-oupia-sub h-4 w-[250px]" />
                            <Skeleton className="bg-border dark:bg-oupia-sub h-4 w-[200px]" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 py-2 px-8">
                        <Skeleton className="bg-border dark:bg-oupia-sub object-cover w-12 aspect-square rounded-full" />
                        <div className="space-y-1">
                            <Skeleton className="bg-border dark:bg-oupia-sub h-4 w-[150px]" />
                            <Skeleton className="bg-border dark:bg-oupia-sub h-4 w-[100px]" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 py-2 px-8">
                        <Skeleton className="bg-border dark:bg-oupia-sub object-cover w-12 aspect-square rounded-full" />
                        <div className="space-y-1">
                            <Skeleton className="bg-border dark:bg-oupia-sub h-4 w-[250px]" />
                            <Skeleton className="bg-border dark:bg-oupia-sub h-4 w-[150px]" />
                        </div>
                    </div>
                </div>
            }
            <div className="flex flex-col gap-2">
                {chatRooms && chatRooms.map((room, index) => {
                    return <React.Fragment key={index}>
                        <UserItem user={room.user1.username === currentUser.username ? room.user2 : room.user1} lastMessage={room.lastMessage} />
                    </React.Fragment>
                })}

                {/* <UserItem user={user} />
                <UserItem user={user2} />
                <UserItem user={user2} />
                <UserItem user={user2} /> */}
            </div>

        </div>
    );
};

export default UsersList;