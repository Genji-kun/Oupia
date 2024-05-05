"use client"

import { commentEndpoints } from '@/configs/axiosEndpoints';
import { authApi, publicApi } from '@/configs/axiosInstance';
import { CommentResponse } from '@/interfaces/Comment';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import CommentItem from './comment-item';
import { Separator } from '@/components/ui/separator';

function CommentList({ postId }: { postId: number }) {
    const getComments = async (postId: number): Promise<CommentResponse[] | undefined> => {
        try {
            const res = await authApi.get(commentEndpoints["comments"], {
                params: {
                    postId: postId,
                }
            })
            return res.data.content;
        } catch (error) {
            console.error(error);
        }
    }

    const { data: comments, isFetching } = useQuery<CommentResponse[] | undefined>({
        queryKey: ["getComments", postId],
        queryFn: () => getComments(postId),
        refetchOnWindowFocus: false,
    })

    if (isFetching) {
        return <></>
    }

    return (
        <>
            {
                comments && comments.length > 0 &&
                <>
                    <div className="px-4 py-2 flex flex-col gap-2">
                        <>
                            {
                                comments.map(comment => {
                                    return <React.Fragment key={comment.id}>
                                        <CommentItem comment={comment} />
                                    </React.Fragment>
                                })
                            }
                        </>
                    </div>
                    <div className="px-4">
                        <Separator />
                    </div>
                </>
            }
        </>
    )
}

export default CommentList
