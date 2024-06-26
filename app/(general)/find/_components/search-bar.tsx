"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Map, Search, X } from 'lucide-react';
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';

const SearchBar = () => {
    const [keyword, setKeyword] = useState<string>("");

    return (
        <div className="flex flex-col gap-y-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full p-4 pb-0">
                <div className="relative">
                    <Input
                        placeholder='Tìm kiếm từ khoá, dự án cụ thể bạn muốn thuê...'
                        className="py-6 pl-12 max-w-3xl"
                        onChange={(evt) => { setKeyword(evt.target.value) }}
                        value={keyword} />
                    <div className="absolute top-1/4 left-3">
                        <Search className="w-6 h-6 " />
                    </div>
                    {keyword.length > 0 &&
                        <Button onClick={() => { setKeyword("") }} variant="ghost" className="absolute rounded-full right-2 top-1/2 -translate-y-1/2 p-2">
                            <X className="w-6 h-6 text-gray-600 dark:text-gray-400 " />
                        </Button>}
                </div>
                <div className="relative">
                    <Input
                        placeholder='Địa điểm muốn thuê...'
                        className="py-6 pl-12 max-w-3xl"
                        onChange={(evt) => { setKeyword(evt.target.value) }}
                        value={keyword} />
                    <div className="absolute top-1/4 left-3">
                        <Map className="w-6 h-6 " />
                    </div>
                    {keyword.length > 0 &&
                        <Button onClick={() => { setKeyword("") }} variant="ghost" className="absolute rounded-full right-2 top-1/2 -translate-y-1/2 p-2">
                            <X className="w-6 h-6 text-gray-600 dark:text-gray-400 " />
                        </Button>}
                </div>
            </div>
            {/* <SearchResult /> */}
            <Separator />
        </div>
    );
};

export default SearchBar;