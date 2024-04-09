"use client"

import { User } from '@/interfaces/User';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import cookies from "react-cookies";

interface IMessageContext {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageContext = createContext<IMessageContext | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<User>({});
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <MessageContext.Provider value={{ user, setUser, expanded, setExpanded }}>
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