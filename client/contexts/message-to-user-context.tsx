"use client"

import { SearchUser } from '@/interfaces/User';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IMessageToUserContext {
    imageFiles: File[];
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const MessageToUserContext = createContext<IMessageToUserContext | undefined>(undefined);

export const MessageToUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [imageFiles, setImageFiles] = useState<File[]>([]);


    return (
        <MessageToUserContext.Provider value={{ imageFiles, setImageFiles }}>
            {children}
        </MessageToUserContext.Provider>
    );
};


export const useMessageToUserContext = (): IMessageToUserContext => {
    const context = useContext(MessageToUserContext);
    if (!context) {
        throw new Error('usedMessageToUserContext phải được dùng trong dMessageToUserProvider');
    }
    return context;
};
