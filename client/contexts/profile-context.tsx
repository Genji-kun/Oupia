"use client"

import { UserInfo } from '@/interfaces/User';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface IProfileContext {
    userInfo: UserInfo | undefined;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
    follows: any[] | undefined;
    setFollows: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}

const ProfileContext = createContext<IProfileContext | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
    const [follows, setFollows] = useState<any[] | undefined>();

    useEffect(() => {
        if (userInfo) {
            document.title = `${userInfo.fullName} | Oupia`;
        }
    }, [userInfo])


    return (
        <ProfileContext.Provider value={{ userInfo, setUserInfo, follows, setFollows }}>
            {children}
        </ProfileContext.Provider>
    );
};


export const useProfileContext = (): IProfileContext => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfileContext phải được dùng trong userInfoProvider');
    }
    return context;
};
