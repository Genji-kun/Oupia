import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListFilter, Search } from 'lucide-react';
import React from 'react';

const UserFilterBar = () => {
    return (
        <div className="flex items-center gap-2 p-5">
            <div className=" relative hidden xl:block w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 z-10" />
                <Input
                    className="p-6 pl-10 dark:bg-slate-800"
                    placeholder="Tìm kiếm người dùng..." />
            </div>
            <Button className="p-6 px-3.5 styled-button">
                <ListFilter size="20" />
            </Button>
        </div>
    );
};

export default UserFilterBar;