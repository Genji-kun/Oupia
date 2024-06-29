"use client"

import { SearchUser } from '@/lib/interfaces/User';
import { usePathname } from 'next/navigation';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface IMessageSearchContext {
    searchUsers: SearchUser[];
    setSearchUsers: React.Dispatch<React.SetStateAction<SearchUser[]>>;
    userQuery: string;
    setUserQuery: React.Dispatch<React.SetStateAction<string>>;
    showResults: boolean;
    setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageSearchContext = createContext<IMessageSearchContext | undefined>(undefined);

export const MessageSearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchUsers, setSearchUsers] = useState<SearchUser[]>([]);
    const [userQuery, setUserQuery] = useState<string>("");
    const [showResults, setShowResults] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const pathname = usePathname();


    useEffect(() => {
        setShowResults(searchUsers.length > 0);
    }, [searchUsers])

    useEffect(() => {
        setShowResults(false);
    }, [pathname])


    return (
        <MessageSearchContext.Provider value={{ searchUsers, setSearchUsers, userQuery, setUserQuery, showResults, setShowResults, isLoading, setIsLoading }}>
            {children}
        </MessageSearchContext.Provider>
    );
};


export const useMessageSearchContext = (): IMessageSearchContext => {
    const context = useContext(MessageSearchContext);
    if (!context) {
        throw new Error('useMessageSearchContext phải được dùng trong MessageSearchProvider');
    }
    return context;
};
