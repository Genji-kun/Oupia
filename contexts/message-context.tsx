"use client"

import { useUserInfo } from '@/hooks/query';
import { useParams } from 'next/navigation';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IMessageContext {
    userInfoData: any;
    isFetchingUserInfo: boolean;
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    messages: any[];
    setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}

const MessageContext = createContext<IMessageContext | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


    const params = useParams()
    const { username } = params;
    const userNameString = Array.isArray(username) ? username.join('') : username;

    const { isFetchingUserInfo, userInfoData } = useUserInfo(userNameString);

    const [expanded, setExpanded] = useState<boolean>(false);
    const [messages, setMessages] = useState<any[]>([]);

    return (
        <MessageContext.Provider value={{ userInfoData, isFetchingUserInfo, expanded, setExpanded, messages, setMessages }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessageContext = (): IMessageContext => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessageContext phải được dùng trong MessageProvider');
    }
    return context;
};
