"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IToggleContext {
    openSearch: boolean;
    setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
    openMap: boolean,
    setOpenMap: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleContext = createContext<IToggleContext | undefined>(undefined);

export const ToggleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [openSearch, setOpenSearch] = useState<boolean>(true);
    const [openMap, setOpenMap] = useState<boolean>(false);


    return (
        <ToggleContext.Provider value={{ openSearch, setOpenSearch, openMap, setOpenMap }}>
            {children}
        </ToggleContext.Provider>
    );
};


export const useToggleContext = (): IToggleContext => {
    const context = useContext(ToggleContext);
    if (!context) {
        throw new Error('useToggleContext phải được dùng trong ToggleProvider');
    }
    return context;
};
