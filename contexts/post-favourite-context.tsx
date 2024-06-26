"use client"

import { commentEndpoints } from '@/configs/axiosEndpoints';
import { api } from '@/lib/api';
import { ICommentItem } from '@/lib/interfaces/response/Comment';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react';

interface IPostFavouriteContext {
    totalFavourites: number;
    setTotalFavourites: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    totalFavourTemp: number;
    setTotalFavourTemp: React.Dispatch<React.SetStateAction<number>>;
    commentInputRef: any;
    postId: number | undefined;
    setPostId: React.Dispatch<React.SetStateAction<number | undefined>>;
    comments: any;
    isFetching: boolean;
    refetch: any;
}

const PostFavouriteContext = createContext<IPostFavouriteContext | undefined>(undefined);

export const PostFavouriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [totalFavourites, setTotalFavourites] = useState<number>(0);
    const [totalFavourTemp, setTotalFavourTemp] = React.useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [postId, setPostId] = useState<number | undefined>();

    const commentInputRef = useRef<any>(null);

    const getComments = async ({ queryKey }: any) => {
        const [_key, { postId }] = queryKey;
        try {
            const res = await api.get(commentEndpoints["comments"], {
                params: {
                    postId: postId,
                    size: 3
                }
            })
            return res.data.content;
        } catch (error) {
            console.error(error);
        }
    }

    const { data: comments, isFetching, refetch } = useQuery<ICommentItem[] | undefined>({
        queryKey: ["getComments", { postId }],
        queryFn: getComments,
        refetchOnWindowFocus: false,
    })


    useEffect(() => {
        setTotalFavourTemp(totalFavourites);
    }, [totalFavourites])

    return (
        <PostFavouriteContext.Provider value={{
            totalFavourites, setTotalFavourites,
            isLoading, setIsLoading,
            totalFavourTemp, setTotalFavourTemp,
            commentInputRef,
            postId, setPostId,
            comments, isFetching, refetch
        }}>
            {children}
        </PostFavouriteContext.Provider>
    );
};


export const usePostFavouriteContext = (): IPostFavouriteContext => {
    const context = useContext(PostFavouriteContext);
    if (!context) {
        throw new Error('usePostFavouriteContext phải được dùng trong PostFavouriteProvider');
    }
    return context;
};
