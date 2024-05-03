"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { commentEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { CommentRequest } from '@/interfaces/Comment';
import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

function CommentInput({ postId }: { postId: number }) {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);

    const [text, setText] = useState<string>("");
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const [commentReq, setCommentReq] = useState<CommentRequest | undefined>();

    useEffect(() => {
        if (text) {
            setCommentReq({
                postId: postId,
                commentContent: text
            });
            setIsHidden(false);
        }
        else
            setIsHidden(true);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [text])

    const handleKeyDown = (evt: KeyboardEvent) => {
        if (evt.key === "Enter") {
            sendComment();
        }
    }


    const sendComment = async () => {
        if (commentReq) {
            try {
                const res = await authApi.post(commentEndpoints["addComment"], commentReq);
                if (res.status === 200) {
                    setText("");
                }
            } catch (error) {
                console.error(error);
                toast.error("Có lỗi xảy ra, vui lòng thử lại.");
            }
        }
    }

    return (
        <>
            {
                currentUser && <div className='relative pl-4 pr-16 pb-2'>
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
            }
        </>

    )
}

export default CommentInput