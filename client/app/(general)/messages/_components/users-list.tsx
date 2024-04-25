"use client"

import React, { useEffect, useState } from 'react';
import UserFilterBar from './user-filter-bar';

import UserItem from './user-item';
import { useSelector } from 'react-redux';
import { authApi } from '@/configs/axiosInstance';
import { authEndpoints } from '@/configs/axiosEndpoints';
import { signInWithCustomToken } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/configs/firebase';
import UserSkeleton from './user-skeleton';
import { useMessageSearchContext } from '@/contexts/message-search-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { convert } from '@/utils/convertAvatarAlt';
import { Skeleton } from '@/components/ui/skeleton';
import { MessagesSquareIcon, UserRoundCogIcon, UserRoundSearchIcon } from 'lucide-react';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';

const UsersList = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const { userQuery, searchUsers, isLoading, setIsLoading } = useMessageSearchContext();

    const router = useRouter();

    const [authToken, setAuthToken] = useState<string>();
    const [chatRooms, setChatRooms] = useState<any[] | undefined>();

    // useEffect(() => {
    //     if (!currentUser) {
    //         router.push("/sign-in");
    //     }
    // }, [currentUser, router]);

    useEffect(() => {
        const getFbToken = async () => {
            try {
                const res = await authApi.get(authEndpoints["getAuthToken"]);
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
        return null;
    }

    return (
        <div className="flex flex-col w-full xl:w-full min-h-[clac(100vh-80px)] lg:min-h-fit h-full pb-3 xl:pb-5 bg-background dark:bg-oupia-base rounded-xl shadow-dark-theme shadow-light-theme">
            <UserFilterBar />
            {
                !chatRooms &&
                <div className="flex flex-col gap-2">
                    <UserSkeleton />
                    <UserSkeleton />
                    <UserSkeleton />
                </div>
            }
            {
                userQuery ?
                    <div className="flex flex-col px-2">
                        <>
                            {
                                isLoading ?
                                    <>
                                        <div className="flex items-center space-x-2 py-2 px-4">
                                            <Skeleton className="bg-border dark:bg-oupia-sub object-cover w-12 aspect-square rounded-full" />
                                            <div className="space-y-1 hidden xl:block">
                                                <Skeleton className={`bg-border dark:bg-oupia-sub h-4 w-[250px]`} />
                                                <Skeleton className={`bg-border dark:bg-oupia-sub h-4 w-[150px]`} />
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 py-2 px-4">
                                            <Skeleton className="bg-border dark:bg-oupia-sub object-cover w-12 aspect-square rounded-full" />
                                            <div className="space-y-1 hidden xl:block">
                                                <Skeleton className={`bg-border dark:bg-oupia-sub h-4 w-[250px]`} />
                                                <Skeleton className={`bg-border dark:bg-oupia-sub h-4 w-[150px]`} />
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 py-2 px-4">
                                            <Skeleton className="bg-border dark:bg-oupia-sub object-cover w-12 aspect-square rounded-full" />
                                            <div className="space-y-1 hidden xl:block">
                                                <Skeleton className={`bg-border dark:bg-oupia-sub h-4 w-[250px]`} />
                                                <Skeleton className={`bg-border dark:bg-oupia-sub h-4 w-[150px]`} />
                                            </div>
                                        </div>

                                    </> :
                                    <>
                                        {searchUsers.length > 0 ?
                                            <>
                                                <h3 className="text-muted-foreground px-4">Kết quả tìm kiếm</h3>
                                                {
                                                    searchUsers.map((user, index) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <div className="w-full flex gap-4 items-center py-2 px-4 rounded-lg">
                                                                    <Avatar className='w-10 h-10'>
                                                                        <AvatarImage src={user.avatar} alt={user.fullName} />
                                                                        <AvatarFallback className="text-sm">{user.fullName && convert(user.fullName)}</AvatarFallback>
                                                                    </Avatar>
                                                                    <div className="hidden xl:flex xl:flex-col justify-center">
                                                                        <h2 className="font-semibold">{user.fullName}</h2>
                                                                        {(() => {
                                                                            switch (user.role) {
                                                                                case "ROLE_TENANT":
                                                                                    return <div className="flex text-xs items-center gap-1.5 text-muted-foreground">
                                                                                        <UserRoundSearchIcon className="w-3 h-3" />
                                                                                        <span>Người tim trọ</span>
                                                                                    </div>
                                                                                case "ROLE_LANDLORD":
                                                                                    return <div className="flex items-center gap-1.5 text-muted-foreground">
                                                                                        <HiOutlineHomeModern className="w-3 h-3" />
                                                                                        <span>Chủ nhà trọ</span>
                                                                                    </div>
                                                                                case "ROLE_ADMIN":
                                                                                    return <div className="flex items-center gap-1.5 text-muted-foreground">
                                                                                        <UserRoundCogIcon className="w-3 h-3" />
                                                                                        <span>Quản trị viên</span>
                                                                                    </div>
                                                                                default:
                                                                                    return <></>
                                                                            }
                                                                        })()}
                                                                    </div>
                                                                    <Link href={`/messages/${user.username}`} className="ml-auto">
                                                                        <Button className="styled-button w-fit h-fit p-2">
                                                                            <MessagesSquareIcon className="w-4 h-4" />
                                                                        </Button>
                                                                    </Link>

                                                                </div>
                                                            </React.Fragment>
                                                        );
                                                    })
                                                }
                                            </> : <h5 className="text-center">Không tìm thấy người dùng</h5>
                                        }
                                    </>
                            }
                        </>
                    </div> :
                    <div className="flex flex-col gap-2">
                        {chatRooms && chatRooms.map((room, index) => {
                            return <React.Fragment key={index}>
                                <UserItem user={room.user1.username === currentUser.username ? room.user2 : room.user1} lastMessage={room.lastMessage} />
                            </React.Fragment>
                        })}
                    </div>
            }
        </div>
    );
};

export default UsersList;