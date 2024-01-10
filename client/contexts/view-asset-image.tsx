"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IAssetImageContext {
    imageIndex: number;
    setImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const AssetImageContext = createContext<IAssetImageContext | undefined>(undefined);

export const AssetImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [imageIndex, setImageIndex] = useState<number>(0);


    return (
        <AssetImageContext.Provider value={{ imageIndex, setImageIndex }}>
            {children}
        </AssetImageContext.Provider>
    );
};


export const useAssetImageContext = (): IAssetImageContext => {
    const context = useContext(AssetImageContext);
    if (!context) {
        throw new Error('useAssetImageContext phải được dùng trong AssetImageProvider');
    }
    return context;
};
