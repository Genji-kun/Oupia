"use client"

import { assetsEndpoints } from '@/configs/axiosEndpoints';
import { api } from '@/lib/api';
import { QUERY_KEY } from '@/lib/constants/QueryKeys';
import { ReviewResponse } from '@/lib/interfaces/Review';
import { reviewService } from '@/services/review.service';
import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface IAssetDetailContext {
    asset: any;
    isFetching: boolean;
    isOpenSearch: boolean;
    setIsOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
    reviews: ReviewResponse[];
    isFetchingReviews: boolean;
    refetch: any;
    setAssetScore: React.Dispatch<React.SetStateAction<number | null | undefined>>;
    assetScore?: number | null;
}

const AssetDetailContext = createContext<IAssetDetailContext | undefined>(undefined);

export const AssetDetailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const params = useParams();
    const { assetSlug } = params;

    const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
    const [assetId, setAssetId] = useState<any>();
    const [assetScore, setAssetScore] = useState<number | null | undefined>();

    const fetchAssetData = async (slug: any) => {
        try {
            const res = await api.get(assetsEndpoints.getAssetBySlugName(slug));
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getReviews = async ({ queryKey }: any) => {
        const [_key, { assetId }] = queryKey;
        try {
            const res = await reviewService.getReview({
                assetId: assetId,
            });
            return res.data.content;
        } catch (error) {
            console.error(error);
        }
        return [];
    }


    const { data: asset, isFetching, isError } = useQuery({
        queryKey: ["assetDetail"],
        queryFn: () => fetchAssetData(assetSlug),
        refetchOnWindowFocus: false,
    });

    const { data: reviews, isFetching: isFetchingReviews, refetch } = useQuery({
        queryKey: [QUERY_KEY.GET_REVIEWS, { assetId }],
        queryFn: getReviews,
        refetchOnWindowFocus: false,
        enabled: !!assetId,
        staleTime: 0
    })

    useEffect(() => {
        if (asset) {
            document.title = `${asset.assetName} | Oupia`;
            setAssetId(asset.id);
            setAssetScore(asset.score);
        }
    }, [asset])

    useEffect(() => {
        isError && notFound();
    }, [isError])

    return (
        <AssetDetailContext.Provider value={{ asset, isFetching, isOpenSearch, setIsOpenSearch, reviews, isFetchingReviews, refetch, assetScore, setAssetScore }}>
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
