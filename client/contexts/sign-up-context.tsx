"use client"

import { User } from '@/interfaces/User';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ISignUpContext {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const SignUpContext = createContext<ISignUpContext | undefined>(undefined);

export const SignUpProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


    const [user, setUser] = useState<User>({});

    return (
        <SignUpContext.Provider value={{ user, setUser }}>
            {children}
        </SignUpContext.Provider>
    );
};


export const useSignUpContext = (): ISignUpContext => {
    const context = useContext(SignUpContext);
    if (!context) {
        throw new Error('useSignUpContext phải được dùng trong SignUpProvider');
    }
    return context;
};
