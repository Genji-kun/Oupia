"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Province = {
    id: number,
    name: string,
    "full_name": string,
    type: string,
    districts: District[],

}

type District = {
    id: number,
    name: string,
    "full_name": string,
    type: string,
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


    useEffect(() => {
        if (!openMap) {
            setSelectedProv(undefined);
            setDistricts([]);
            setSelectedDist(undefined);
        }
    }, [openMap]);


    return (
        <FindAssetContext.Provider value={{ openSearch, setOpenSearch, openMap, setOpenMap, provinces, setProvinces, selectedProv, setSelectedProv, districts, setDistricts, selectedDist, setSelectedDist }}>
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
