"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IPostFavouriteContext {
    totalFavourites: number;
    setTotalFavourites: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostFavouriteContext = createContext<IPostFavouriteContext | undefined>(undefined);

export const PostFavouriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [totalFavourites, setTotalFavourites] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <PostFavouriteContext.Provider value={{ totalFavourites, setTotalFavourites, isLoading, setIsLoading }}>
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
