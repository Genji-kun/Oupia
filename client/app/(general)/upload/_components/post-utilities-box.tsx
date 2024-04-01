"use client"

import { Hash, Image, ImageIcon, Type } from 'lucide-react'
import React from 'react'

function PostUtilitiesBox() {
    return (
        <div className="flex flex-col justify-center items-center gap-4 mx-10">
            <h1 className="text-xl font-semibold">Thêm thông tin bài viết</h1>
            <div className="w-full gap-2 grid grid-cols-2 px-8 justify-center">
                <div className="util-button dark:bg-oupia-sub">
                    <Type className="h-8 w-8" />
                    <span className="font-semibold">Nội dung</span>
                </div>
                <div className="util-button dark:bg-oupia-sub">
                    <Hash className="h-8 w-8" />
                    <span className="font-semibold">Hash Tag</span>
                </div>
                <div className="col-span-2">
                    <div className="w-1/2 mx-auto util-button dark:bg-oupia-sub">
                        <ImageIcon className="h-8 w-8" />
                        <span className="font-semibold">Hình ảnh</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PostUtilitiesBox