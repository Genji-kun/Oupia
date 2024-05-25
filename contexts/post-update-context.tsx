"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface IPostUpdateContext {
    updatePost: any;
    setUpdatePost: React.Dispatch<React.SetStateAction<any>>;
}

const PostUpdateContext = createContext<IPostUpdateContext | undefined>(undefined);

export const PostUpdateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [updatePost, setUpdatePost] = useState<any>({});

    return (
        <PostUpdateContext.Provider value={{ updatePost, setUpdatePost }}>
            {children}
        </PostUpdateContext.Provider>
    );
};


export const usePostUpdateContext = (): IPostUpdateContext => {
    const context = useContext(PostUpdateContext);
    if (!context) {
        throw new Error('usePostUpdateContext phải được dùng trong PostUpdateProvider');
    }
    return context;
};
