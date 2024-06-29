"use client"

import { postEndpoints } from '@/configs/axiosEndpoints';
import { publicApi } from '@/configs/axiosInstance';
import { PostResponse } from '@/lib/interfaces/Post';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface IForumContext {
    posts: PostResponse[];
    setPosts: React.Dispatch<React.SetStateAction<PostResponse[]>>;
    hasNextPage: boolean;
    fetchNextPage: any;
    isFetchingNextPage: boolean;
    isLast: boolean;
    isFetching: boolean
}

const ForumContext = createContext<IForumContext | undefined>(undefined);

export const ForumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [isSorted, setIsSorted] = useState<boolean>(false);
    const [isLast, setIsLast] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const fetchPosts = async ({ pageParam }: { pageParam: number }) => {
        const res = await publicApi.get(postEndpoints["postList"], {
            params: {
                page: pageParam,
            }
        });
        if (res.status === 200) {
            setIsLast(res.data.last);
            return res.data.content;
        } else {
            throw new Error('Error fetching posts');
        }
    };

    const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        {
            queryKey: ['posts'],
            queryFn: fetchPosts,
            initialPageParam: 1,
            getNextPageParam: () => {
                return currentPage;
            }
        });

    useEffect(() => {
        if (data) {
            setCurrentPage(curr => curr + 1);
            setPosts(data.pages.reduce((acc, val) => acc.concat(val), []));
        }
    }, [data])

    useEffect(() => {
        if (posts.length > 0 && !isSorted) {
            setPosts((prev) => {
                const sortedPost = [...prev];
                sortedPost.sort((a: PostResponse, b: PostResponse) => {
                    return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
                })
                return sortedPost;
            });
            setIsSorted(true);
        }
    }, [posts, isSorted])

    return (
        <ForumContext.Provider value={{

            posts, setPosts,
            hasNextPage, fetchNextPage,
            isFetchingNextPage, isLast,
            isFetching

        }}>
            {children}
        </ForumContext.Provider>
    );
};


export const useForumContext = (): IForumContext => {
    const context = useContext(ForumContext);
    if (!context) {
        throw new Error('useForumContext phải được dùng trong ForumProvider');
    }
    return context;
};
