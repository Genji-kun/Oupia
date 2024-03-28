"use client"

import { User } from '@/interfaces/User';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ISignUpContext {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    avatar: string;
    setAvatar: React.Dispatch<React.SetStateAction<string>>;
    avatarFile: any;
    setAvatarFile: React.Dispatch<React.SetStateAction<any>>;
}

const SignUpContext = createContext<ISignUpContext | undefined>(undefined);

export const SignUpProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<User>({});
    const [avatar, setAvatar] = useState<string>("");
    const [avatarFile, setAvatarFile] = useState<File>();

    return (
        <SignUpContext.Provider value={{ user, setUser, avatar, setAvatar, avatarFile, setAvatarFile }}>
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
