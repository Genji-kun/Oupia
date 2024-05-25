"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface IMessageContext {
    receiveUser: any;
    setReceiveUser: React.Dispatch<React.SetStateAction<any>>;
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    messages: any[];
    setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}

const MessageContext = createContext<IMessageContext | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [receiveUser, setReceiveUser] = useState<any>();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [messages, setMessages] = useState<any[]>([]);


    return (
        <MessageContext.Provider value={{ receiveUser, setReceiveUser, expanded, setExpanded, messages, setMessages }}>
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
