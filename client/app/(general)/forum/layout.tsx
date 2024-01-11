import React, { ReactNode } from 'react';
import UserViewer from './_components/user-viewer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Oupia | Diễn đàn trao đổi',
    description: '',
}

const ForumLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="container h-full">
            <div className="grid grid-cols-7 h-full">
                <div className=" col-span-2 invisible"></div>
                <div className="col-span-7 xl:col-span-3 px-4 xl:px-0">
                    {children}
                </div>
                <div className=" col-span-2 invisible"></div>
                <div className="h-screen bg-background col-span-2 hidden xl:block fixed right-0">
                    <UserViewer />
                </div>
            </div>
        </div>
    );
};

export default ForumLayout;