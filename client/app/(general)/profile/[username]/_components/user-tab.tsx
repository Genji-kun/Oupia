'use client';

import React, { useState } from 'react';

import { useTabs } from '@/hooks/use-tabs';
import { Framer } from '@/lib/framer';
import { AlertTriangle, Image as ImageIcon, LayoutGrid, UserRound, UsersRound } from 'lucide-react';
import { useParams } from 'next/navigation';

const UserTab = () => {
    const params = useParams();
    const { username } = params;

    const [hookProps] = useState({
        tabs: [
            {
                label:
                    <div className="flex gap-x-2 items-center">
                        <LayoutGrid size="16" />
                        <span>Tổng quan</span>
                    </div>,
                id: 'gerenal',
                link: `/profile/${username}`
            },
            {
                label:
                    <div className="flex gap-x-2 items-center">
                        <UserRound size="16" />
                        <span>Thông tin</span>
                    </div>,
                id: 'info',
                link: `/profile/${username}/information`
            },
            {
                label:
                    <div className="flex gap-x-2 items-center">
                        <ImageIcon size="16" />
                        <span>Hình ảnh</span>
                    </div>,
                id: 'album',
                link: `/profile/${username}/album`
            },
            {
                label:
                    <div className="flex gap-x-2 items-center">
                        <UsersRound size="16" />
                        <span>Người theo dõi</span>
                    </div>,
                id: 'follows',
                link: `/profile/${username}/follows`
            },
            {
                label:
                    <div className="flex gap-x-2 items-center">
                        <AlertTriangle size="16" />
                        <span>Báo cáo</span>
                    </div>,
                id: 'report',
                link: `/profile/${username}/report`
            }
        ],
        initialTabId: 'Matches',
    });
    const framer = useTabs(hookProps);

    return (
        <div className="w-full flex flex-col">
            <div className="border-b w-full items-center flex border-border">
                <Framer.Tabs {...framer.tabProps} />
            </div>
        </div>
    );
};

export default UserTab;