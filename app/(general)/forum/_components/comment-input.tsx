"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { commentEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { usePostFavouriteContext } from '@/contexts/post-favourite-context';
import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

function CommentInput({ postId }: { postId: number }) {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const { commentInputRef, refetch } = usePostFavouriteContext();

    const [text, setText] = useState<string>("");
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const [submit, setSubmit] = useState<boolean>(false);
    const [commentReq, setCommentReq] = useState<any>();

    useEffect(() => {
        if (text) {
            setIsHidden(false);
        }
        else
            setIsHidden(true);

        if (text && submit) {
            setCommentReq({
                postId: postId,
                commentContent: text
            });
            sendComment();
            setSubmit(false);
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [text, submit, postId, sendComment])

    const handleKeyDown = (evt: KeyboardEvent) => {
        if (evt.key === "Enter") {
            setSubmit(true);
        }
    }


    async function sendComment() {
        if (commentReq) {
            try {
                const res = await authApi.post(commentEndpoints["addComment"], commentReq);
                if (res.status === 200) {
                    setText("");
                    refetch();
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
                        ref={commentInputRef}
                        value={text}
                        onChange={(evt) => setText(evt.target.value)}
                        placeholder='Nhập bình luận...'
                        className="p-0 border-none dark:bg-transparent" />
                    {!isHidden &&
                        <Button
                            variant={"ghost"}
                            onClick={() => setSubmit(true)}
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