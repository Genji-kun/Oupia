import React, { ReactNode } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
    title: 'Diễn đàn trao đổi',
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
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(ForumLayout), { ssr: false })
