"use client"

import React, { useEffect } from 'react'
import CommentItem from './comment-item';
import { Separator } from '@/components/ui/separator';
import { usePostFavouriteContext } from '@/contexts/post-favourite-context';
import { ICommentItem } from '@/lib/interfaces/response/Comment';

function CommentList({ postId }: { postId: number }) {

    const { comments, setPostId, isFetching } = usePostFavouriteContext();

    useEffect(() => {
        setPostId(postId);
    }, [setPostId, setPostId])

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
                                comments.map((comment: ICommentItem) => {
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
