"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";


function CommentInput() {

    const [text, setText] = useState<string>("");
    const [isHidden, setIsHidden] = useState<boolean>(true);

    useEffect(() => {
        text ? setIsHidden(false) : setIsHidden(true);
    }, [text])

    const sendComment = async () => {
        setText("");
    }

    return (
        <div className='relative pl-4 pr-16 pb-2'>
            <Input
                value={text}
                onChange={(evt) => setText(evt.target.value)}
                placeholder='Nhập bình luận...'
                className="p-0 border-none dark:bg-transparent" />
            {!isHidden &&
                <Button
                    variant={"ghost"}
                    onClick={sendComment}
                    className="w-fit h-fit p-2 rounded-full absolute right-4 top-1">
                    <IoSend size={18} className="text-primary" />
                </Button>
            }
        </div>
    )
}

export default CommentInput