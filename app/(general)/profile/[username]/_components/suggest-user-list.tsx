"use client"

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import SuggestUserItem from './suggest-user-item';
import { useProfileContext } from '@/contexts/profile-context';
import { publicApi } from '@/configs/axiosInstance';
import { followEndpoints } from '@/configs/axiosEndpoints';
import { useQuery } from '@tanstack/react-query';
import UserSkeleton from './user-skeleton';

const SuggestUserList = () => {
    const { userInfoData } = useProfileContext();

    const fetchPosts = async () => {
        const url = followEndpoints.getFollowings(Number(userInfoData?.id));
        const res = await publicApi.get(url, {
            params: {
                size: 4
            }
        });
        if (res.status === 200) {
            return res.data.content;
        } else {
            throw new Error('Error fetching posts');
        }
    };

    const { data: users, isLoading } = useQuery({ queryKey: ['followings'], queryFn: fetchPosts });

    if (isLoading) {
        return <>
            <Card className="shadow-lg dark:bg-oupia-base">
                <CardHeader>
                    <h2 className="font-semibold text-xl">Người dùng gợi ý</h2>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <UserSkeleton />
                    <UserSkeleton />
                    <UserSkeleton />
                </CardContent>
            </Card >
        </>
    }

    return (
        <Card className="shadow-lg dark:bg-oupia-base">
            <CardHeader>
                <h2 className="font-semibold text-xl">Người dùng gợi ý</h2>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Separator className="mb-2" />
                <div className="flex flex-col gap-2">
                    {users && users.map((user: any, index: number) => {
                        return <React.Fragment key={index}>
                            <SuggestUserItem user={user} />
                        </React.Fragment>
                    })}
                </div>
            </CardContent>
        </Card>

    );
};

export default SuggestUserList;