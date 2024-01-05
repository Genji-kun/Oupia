"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IToggleSearchContext {
    tab: string;
    setTab: React.Dispatch<React.SetStateAction<string>>;
}

const ToggleSearchContext = createContext<IToggleSearchContext | undefined>(undefined);

export const ToggleSearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tab, setTab] = useState<string>("sign-in");

    return (
        <ToggleSearchContext.Provider value={{ tab, setTab }}>
            {children}
        </ToggleSearchContext.Provider>
    );
};


export const useToggleSearchContext = (): IToggleSearchContext => {
    const context = useContext(ToggleSearchContext);
    if (!context) {
        throw new Error('useToggleSearchContext phải được dùng trong ToggleSearchProvider');
    }
    return context;
};
