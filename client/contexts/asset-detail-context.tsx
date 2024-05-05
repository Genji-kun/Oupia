"use client"

import { assetsEndpoints } from '@/configs/axiosEndpoints';
import { publicApi } from '@/configs/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface IAssetDetailContext {
    asset: any;
    isFetching: boolean;
    isOpenSearch: boolean;
    setIsOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssetDetailContext = createContext<IAssetDetailContext | undefined>(undefined);

export const AssetDetailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const params = useParams();
    const { assetSlug } = params;

    const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

    const fetchAssetData = async (slug: any) => {
        try {
            const res = await publicApi.get(assetsEndpoints.getAssetBySlugName(slug));
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const { data: asset, isFetching, isError } = useQuery({
        queryKey: ["assetDetail"],
        queryFn: () => fetchAssetData(assetSlug),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (asset) {
            document.title = `${asset.assetName} | Oupia`;
        }
    }, [asset])

    useEffect(() => {
        isError && notFound();
    }, [isError])

    return (
        <AssetDetailContext.Provider value={{ asset, isFetching, isOpenSearch, setIsOpenSearch }}>
            {children}
        </AssetDetailContext.Provider>
    );
};


export const useAssetDetailContext = (): IAssetDetailContext => {
    const context = useContext(AssetDetailContext);
    if (!context) {
        throw new Error('useAssetDetailContext phải được dùng trong AssetDetailProvider');
    }
    return context;
};
