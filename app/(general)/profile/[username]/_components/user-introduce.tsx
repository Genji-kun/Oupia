"use client"

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useProfileContext } from '@/contexts/profile-context';
import { format } from 'date-fns';
import { Clock, Info, UserRoundCheck } from 'lucide-react';
import React from 'react';

const UserIntroduce = () => {

    const { userInfoData } = useProfileContext();

    return (
        <Card className="shadow-lg dark:bg-oupia-base">
            <CardHeader>
                <h2 className="font-semibold text-xl">Giới thiệu</h2>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Separator className="mb-2" />
                <div className="flex items-center gap-x-3">
                    <Info size="20" className="text-muted-foreground" />
                    <h3>
                        {(() => {
                            switch (userInfoData?.role) {
                                case "ROLE_TENANT":
                                    return "Người tìm trọ"
                                case "ROLE_LANDLORD":
                                    return "Chủ nhà trọ"
                                case "ROLE_ADMIN":
                                    return "Quản trị viên"
                                default:
                                    return <></>
                            }
                        })()}
                    </h3>
                </div>
                <div className="flex items-center gap-x-3">
                    <UserRoundCheck size="20" className="text-muted-foreground" />
                    <h3>Có {userInfoData?.totalFollower} người theo dõi</h3>
                </div>
                <div className="flex items-center gap-x-3">
                    <Clock size="20" className="text-muted-foreground" />
                    <h3>Tham gia vào {format(userInfoData!.createdAt, "dd-MM-yyyy")}</h3>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserIntroduce;