"use client"

import { usePathname } from 'next/navigation';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IAuthTabContext {
    tab: string;
    setTab: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    provider: "GOOGLE" | "FACEBOOK" | undefined;
    setProvider: React.Dispatch<React.SetStateAction<"GOOGLE" | "FACEBOOK" | undefined>>;
}

const AuthTabContext = createContext<IAuthTabContext | undefined>(undefined);

export const AuthTabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const pathname = usePathname();

    const [tab, setTab] = useState<string>(pathname === "/sign-in" ? "sign-in" : "sign-up");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [provider, setProvider] = useState<"GOOGLE" | "FACEBOOK" | undefined>();

    return (
        <AuthTabContext.Provider value={{ tab, setTab, isLoading, setIsLoading, provider, setProvider }}>
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
