"use client"

import { useUserInfo } from '@/hooks/query';
import { UserInfo } from '@/lib/interfaces/User';
import { useParams } from 'next/navigation';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface IProfileContext {
    isFetchingUserInfo: boolean;
    userInfoData: UserInfo;
    follows: any[] | undefined;
    setFollows: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}

const ProfileContext = createContext<IProfileContext | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [follows, setFollows] = useState<any[] | undefined>();

    const params = useParams()
    const { username } = params;
    const userNameString = Array.isArray(username) ? username.join('') : username;
    const { isFetchingUserInfo, userInfoData } = useUserInfo(userNameString);

    useEffect(() => {
        if (userInfoData) {
            document.title = `${userInfoData.fullName} | Oupia`;
        }
    }, [userInfoData])


    return (
        <ProfileContext.Provider value={{ isFetchingUserInfo, userInfoData, follows, setFollows }}>
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
