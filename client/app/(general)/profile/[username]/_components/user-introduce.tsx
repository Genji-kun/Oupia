import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Info, Newspaper, UserRoundCheck } from 'lucide-react';
import React from 'react';

const UserIntroduce = () => {
    return (
        <Card>
            <CardHeader>
                <h2 className="font-semibold text-xl">Giới thiệu</h2>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Separator className="mb-2" />
                <div className="flex items-center gap-x-3">
                    <Info size="20" className="text-gray-600 dark:text-gray-400" />
                    <h1>Người cho thuê</h1>
                </div>
                <div className="flex items-center gap-x-3">
                    <UserRoundCheck size="20" className="text-gray-600 dark:text-gray-400" />
                    <h1>Có 126 người theo dõi</h1>
                </div>
                <div className="flex items-center gap-x-3">
                    <Clock size="20" className="text-gray-600 dark:text-gray-400" />
                    <h1>Tham gia vào tháng 06 năm 2021</h1>
                </div>
                <div className="flex items-center gap-x-3">
                    <Newspaper size="20" className="text-gray-600 dark:text-gray-400" />
                    <h1>Đã đăng 34 bài viết</h1>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserIntroduce;