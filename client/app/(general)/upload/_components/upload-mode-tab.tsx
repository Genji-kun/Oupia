"use client"

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

function UploadModeTab() {

    const pathanme = usePathname();

    const [tabName, setTabName] = useState();

    return (
        <Tabs defaultValue={""}>
            <TabsList className="bg-oupia-sub p-1 h-fit border w-full">
                <TabsTrigger value="post" className="py-2 px-4 gap-2 w-full">
                    <span className="font-[500]">Đăng bài viết</span>
                </TabsTrigger>
                <TabsTrigger value="asset" className="py-2 px-4 gap-2 w-full">
                    <Lock className="w-4 h-4" />
                    <span className="font-[500]">Thêm Căn hộ</span>
                </TabsTrigger>
            </TabsList>
        </Tabs >

    );
}

export default UploadModeTab;