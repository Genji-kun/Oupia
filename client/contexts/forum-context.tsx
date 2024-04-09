"use client"

import { PostResponse } from '@/interfaces/Post';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IForumContext {
    posts: PostResponse[];
    setPosts: React.Dispatch<React.SetStateAction<PostResponse[]>>;
}

const ForumContext = createContext<IForumContext | undefined>(undefined);

export const ForumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<PostResponse[]>([]);

    return (
        <ForumContext.Provider value={{ posts, setPosts }}>
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
