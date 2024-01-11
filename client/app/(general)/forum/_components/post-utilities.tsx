"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cross, Search, Upload, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const PostUtilities = () => {
    const [keyword, setKeyword] = useState<string>("");

    return (
        <div className="flex flex-col gap-2">
            <div className="relative">
                <Input
                    placeholder='Tìm nội dung bài viết...'
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
            <div className="grid grid-cols-3 gap-2">
                <div>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Mốc thời gian" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                <SelectItem value="today">Trong hôm nay</SelectItem>
                                <SelectItem value="month">Trong tháng này</SelectItem>
                                <SelectItem value="year">Trong năm nay</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Loại bài viết" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                <SelectItem value="content">Chỉ có nội dung</SelectItem>
                                <SelectItem value="image">Có chứa hình ảnh</SelectItem>
                                <SelectItem value="attached">Có đính kèm bài cho thuê</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Link href="/upload">
                        <Button className="styled-button w-full gap-x-2">
                            <Upload size="18" />
                            <span className="text-normal">Đăng bài mới</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostUtilities;