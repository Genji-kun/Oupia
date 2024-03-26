"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IUploadContext {
    uploadForm: any;
    setUploadForm: React.Dispatch<React.SetStateAction<any>>;
}

const UploadContext = createContext<IUploadContext | undefined>(undefined);

export const UploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [uploadForm, setUploadForm] = useState<any>({});

    return (
        <UploadContext.Provider value={{ uploadForm, setUploadForm }}>
            {children}
        </UploadContext.Provider>
    );
};


export const useUploadContext = (): IUploadContext => {
    const context = useContext(UploadContext);
    if (!context) {
        throw new Error('useUploadContext phải được dùng trong UploadProvider');
    }
    return context;
};
