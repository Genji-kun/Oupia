"use client"

import { assetsEndpoints } from '@/configs/axiosEndpoints';
import { publicApi } from '@/configs/axiosInstance';
import { AssetResponse } from '@/lib/types/interfaces/Asset';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

type Province = {
    id: string,
    name: string,
    typeText: string,
    slug: string,
}

type District = {
    id: string,
    code: string,
    name: string,
    provinceId: string,
    type: number,
    typeText: string,
}

interface IFindAssetContext {
    openSearch: boolean;
    setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
    openMap: boolean,
    setOpenMap: React.Dispatch<React.SetStateAction<boolean>>;
    provinces: Province[];
    setProvinces: React.Dispatch<React.SetStateAction<Province[]>>;
    selectedProv: Province | undefined;
    setSelectedProv: React.Dispatch<React.SetStateAction<Province | undefined>>;
    districts: District[];
    setDistricts: React.Dispatch<React.SetStateAction<District[]>>;
    selectedDist: District | undefined;
    setSelectedDist: React.Dispatch<React.SetStateAction<District | undefined>>;
    // assets: AssetResponse[];
    // isFetching: boolean;
    pageSize: number;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    keyword: string;
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    priceRate: number[];
    setPriceRate: React.Dispatch<React.SetStateAction<number[]>>;
    polyReq: string;
    setPolyReq: React.Dispatch<React.SetStateAction<string>>;
    assetsByPolygon: AssetResponse[];
    isFetchingPolygon: boolean;
    totalPages: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;

    maxPeople: string;
    setMaxPeople: React.Dispatch<React.SetStateAction<string>>;
}

const FindAssetContext = createContext<IFindAssetContext | undefined>(undefined);

export const FindAssetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // Search Mode
    const [openSearch, setOpenSearch] = useState<boolean>(true);
    const [openMap, setOpenMap] = useState<boolean>(false);


    // Provinces
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [selectedProv, setSelectedProv] = useState<Province | undefined>();

    // Districts
    const [districts, setDistricts] = useState<District[]>([]);
    const [selectedDist, setSelectedDist] = useState<District | undefined>();

    // Paginations
    const [pageSize, setPageSize] = useState<number>(8);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);


    // Filter
    const [keyword, setKeyword] = useState<string>("");
    const [priceRate, setPriceRate] = useState<number[]>([0, 50000000]);
    const [maxPeople, setMaxPeople] = useState<string>("");


    //Map Polygon
    const [polyReq, setPolyReq] = useState<string>("");

    const debounceKw = useDebounce(keyword, 1000);

    const debouncePrice = useDebounce(priceRate, 1000);


    // const getAssetsData = async ({ queryKey }: any) => {
    //     const [_key, { pageSize, currentPage, debounceKw, debouncePrice, maxPeople }] = queryKey;
    //     try {
    //         const res = await publicApi.get(assetsEndpoints["assets"], {
    //             params: {
    //                 keyword: debounceKw[0],
    //                 size: pageSize,
    //                 page: currentPage,
    //                 minPrice: debouncePrice[0][0],
    //                 maxPrice: debouncePrice[0][1],
    //                 maxPeople: maxPeople
    //             }
    //         })
    //         if (res.data.totalPages > 0)
    //             setTotalPages(res.data.totalPages);
    //         else
    //             setTotalPages(1);
    //         return res.data.content;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const getAssetsDataByPolygon = async ({ queryKey }: any) => {
        const [_key, { polyReq }] = queryKey;
        if (polyReq) {
            console.log(polyReq)
            try {
                const res = await publicApi.post(assetsEndpoints["polygon"],
                    {
                        polygon: polyReq
                    });
                return res.data;
            } catch (error) {
                console.error(error);
            }
        }
        return [];
    }

    const { data: assetsByPolygon, isFetching: isFetchingPolygon } = useQuery({
        queryKey: ["searchAssetByPolygon", { polyReq }],
        queryFn: getAssetsDataByPolygon,
        enabled: !!polyReq,
        refetchOnWindowFocus: false,
    });

    // const { data: assets, isFetching } = useQuery({
    //     queryKey: ["searchAsset", { pageSize, currentPage, debounceKw, debouncePrice, maxPeople }],
    //     queryFn: getAssetsData,
    //     refetchOnWindowFocus: false,
    // })

    useEffect(() => {
        if (!openMap) {
            setSelectedProv(undefined);
            setDistricts([]);
            setSelectedDist(undefined);
        } else {
            setKeyword("");
            setPageSize(8);
            setCurrentPage(1);
        }
    }, [openMap]);


    return (
        <FindAssetContext.Provider value={
            {
                openSearch, setOpenSearch,
                openMap, setOpenMap,
                provinces, setProvinces,
                selectedProv, setSelectedProv,
                districts, setDistricts,
                selectedDist, setSelectedDist,

                // assets, isFetching,

                pageSize, setPageSize,
                currentPage, setCurrentPage,
                keyword, setKeyword,
                priceRate, setPriceRate,
                polyReq, setPolyReq,

                assetsByPolygon, isFetchingPolygon,

                maxPeople, setMaxPeople,
                totalPages, setTotalPages
            }}>
            {children}
        </FindAssetContext.Provider>
    );
};


export const useFindAssetContext = (): IFindAssetContext => {
    const context = useContext(FindAssetContext);
    if (!context) {
        throw new Error('useFindAssetContext phải được dùng trong FindAssetProvider');
    }
    return context;
};
