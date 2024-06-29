import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAssetDetailContext } from '@/contexts/asset-detail-context';
import { useGetUserById } from '@/hooks/query';
import { convert } from '@/utils/convertAvatarAlt';
import { MessagesSquare } from 'lucide-react';
import Link from 'next/link';
import React from 'react';


const AssetOwner = () => {

    const { asset } = useAssetDetailContext();

    const { isFetchingUserInfo, userInfoData } = useGetUserById(asset?.userId);

    if (isFetchingUserInfo) {
        return <Skeleton className='w-full aspect-video bg-border dark:bg-oupia-sub' />
    }

    return (
        <Card className="shadow bg-background shadow-dark-theme">
            <CardHeader className="pb-4">
                <div className="flex items-center w-full justify-between">
                    <div className='flex items-center gap-4'>
                        <Link href={`/profile/${userInfoData?.username}`}>
                            <Avatar className='w-16 h-16'>
                                <AvatarImage src={userInfoData?.avatar} alt={userInfoData?.fullName} />
                                <AvatarFallback>{convert(userInfoData?.fullName ?? "")}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div className="flex flex-col h-fit">
                            <Link href={`/profile/${userInfoData?.username}`}>
                                <h1 className="font-semibold font-montserrat text-xl">{userInfoData?.fullName}</h1>
                            </Link>
                            <h5 className='text-muted-foreground text-sm'>Điểm tiếng tăm: {userInfoData?.reputationScore}</h5>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Link href={`/messages/${userInfoData?.username}`}>
                            <Button className="styled-button flex gap-x-2">
                                <MessagesSquare size={16} />
                                <span>Nhắn tin</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};

export default AssetOwner;