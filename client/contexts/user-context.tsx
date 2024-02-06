"use client"

import { User } from '@/interfaces/User';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IUserContext {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


    const [user, setUser] = useState<User | undefined>();

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUserContext = (): IUserContext => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext phải được dùng trong UserProvider');
    }
    return context;
};
