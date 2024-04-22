"use client"

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

function UploadModeTab() {

    const pathname = usePathname();
    const router = useRouter();

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);

    const changeTab = (tabName: string) => {
        if (tabName === "post") {
            router.push("/upload");
        } else {
            router.push("/upload/asset");
        }
    }

    return (
        <Tabs defaultValue={pathname === "/upload" ? "post" : "asset"} onValueChange={(value) => { changeTab(value) }}>
            <TabsList className="bg-oupia-sub p-1 h-fit border w-full">
                <TabsTrigger value="post" className="py-2 px-4 gap-2 w-full">
                    <span className="font-semibold">Đăng bài viết</span>
                </TabsTrigger>
                <TabsTrigger disabled={currentUser.role === "ROLE_TENANT"} value="asset" className="py-2 px-4 gap-2 w-full">
                    {currentUser.role === "ROLE_TENANT" && <Lock className="w-4 h-4" />}
                    <span className="font-semibold">Thêm Căn hộ</span>
                </TabsTrigger>
            </TabsList>
        </Tabs >

    );
}

export default UploadModeTab;