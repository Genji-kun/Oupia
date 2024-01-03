import { Separator } from '@/components/ui/separator';
import React from 'react';

const UtilitiesBar = () => {
    return (
        <div className="flex flex-col gap-y-4 p-4 rounded border border-border w-96 h-screen shadow">
            <h1 className="font-bold text-2xl text-center">Bộ lọc & tìm kiếm bài viết</h1>
            <Separator className="w-[60%] mx-auto"></Separator>

        </div>
    );
};

export default UtilitiesBar;