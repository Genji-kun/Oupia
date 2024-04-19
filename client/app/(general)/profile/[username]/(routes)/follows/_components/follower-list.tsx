"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { followEndpoints } from '@/configs/axiosEndpoints';
import { publicApi } from '@/configs/axiosInstance';
import { useProfileContext } from '@/contexts/profile-context';
import { Follower } from '@/interfaces/User';
import React, { useEffect, useState } from 'react'
import FollowerSkeleton from './follower-skeleton';
import FollowerItem from './follower-item';

function FollowerList() {

    const { userInfo } = useProfileContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [followers, setFollowers] = useState<Follower[] | undefined>();

    useEffect(() => {
        if (userInfo)
            fetchFollowersData(Number(userInfo.id));
    }, [userInfo])


    const fetchFollowersData = async (id: number) => {
        try {
            const req = followEndpoints.getFollowersInfo(id);
            const res = await publicApi.get(req);
            if (res.status === 200) {
                setFollowers(res.data.content);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-4 gap-x-8 px-20">
            {isLoading ?
                <>
                    <FollowerSkeleton />
                    <FollowerSkeleton />
                    <FollowerSkeleton />
                    <FollowerSkeleton />
                </> : <>
                    {followers && followers.length > 0 ? <>
                        {followers.map((follower, index) => {
                            return <React.Fragment key={index}>
                                <FollowerItem user={follower} />
                            </React.Fragment>
                        })}
                    </> : <></>}
                </>
            }
        </div>
    )
}

export default FollowerList