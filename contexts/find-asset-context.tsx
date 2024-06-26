"use client"

import { useSearchAssets, useSearchAssetsByPolygon } from '@/hooks/query';
import { IAssetItem } from '@/lib/interfaces/response/Asset';
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
    assetResults: IAssetItem[];
    isFetchingAssetResults: boolean;
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
    assetsByPolygon: IAssetItem[];
    isFetchingPolygon: boolean;
    totalPages: number;
    maxPeople: string;
    setMaxPeople: React.Dispatch<React.SetStateAction<string>>;
}

const FindAssetContext = createContext<IFindAssetContext | undefined>(undefined);

export const FindAssetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // Search Mode
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


    // Filter
    const [keyword, setKeyword] = useState<string>("");
    const [priceRate, setPriceRate] = useState<number[]>([0, 50000000]);
    const [maxPeople, setMaxPeople] = useState<string>("");


    //Map Polygon
    const [polyReq, setPolyReq] = useState<string>("");

    const debounceKw = useDebounce(keyword, 1000);

    const debouncePrice = useDebounce(priceRate, 1000);

    const { assetResults, isFetchingAssetResults, totalPages } = useSearchAssets(pageSize, currentPage, debounceKw[0], [debouncePrice[0][0], debouncePrice[0][1]], Number(maxPeople));

    const { assetsByPolygon, isFetchingPolygon } = useSearchAssetsByPolygon(polyReq)


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
                openMap, setOpenMap,
                provinces, setProvinces,
                selectedProv, setSelectedProv,
                districts, setDistricts,
                selectedDist, setSelectedDist,

                assetResults, isFetchingAssetResults,

                pageSize, setPageSize,
                currentPage, setCurrentPage,
                keyword, setKeyword,
                priceRate, setPriceRate,
                polyReq, setPolyReq,

                assetsByPolygon, isFetchingPolygon,

                maxPeople, setMaxPeople,
                totalPages
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
