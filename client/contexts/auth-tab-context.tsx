"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IAuthTabContext {
    tab: string;
    setTab: React.Dispatch<React.SetStateAction<string>>;
}

const AuthTabContext = createContext<IAuthTabContext | undefined>(undefined);

export const AuthTabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tab, setTab] = useState<string>("sign-in");

    return (
        <AuthTabContext.Provider value={{ tab, setTab }}>
            {children}
        </AuthTabContext.Provider>
    );
};


export const useAuthTabContext = (): IAuthTabContext => {
    const context = useContext(AuthTabContext);
    if (!context) {
        throw new Error('useAuthTabContext phải được dùng trong AuthTabProvider');
    }
    return context;
};
