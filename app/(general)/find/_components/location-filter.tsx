"use client"

import React, { useEffect } from 'react'
import { useFindAssetContext } from '@/contexts/find-asset-context'
import { vnProvincesApi } from '@/configs/axiosInstance'
import { vnpEndpoints } from '@/configs/axiosEndpoints'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

const LocationFilter = () => {

    const { provinces, setProvinces, setSelectedProv, districts, setDistricts, setSelectedDist, selectedDist } = useFindAssetContext();

    useEffect(() => {
        if (provinces.length === 0) {
            handleGetProvs();
        }
    }, [provinces, handleGetProvs]);

    // Fetch Province Data
    async function handleGetProvs () {
        try {
            const res = await vnProvincesApi.get(vnpEndpoints["provinces"], {
                params: {
                    size: 63,
                }
            });
            setProvinces(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch District Data
    const handleSelectProv = async (prov: string) => {
        const provJSON = JSON.parse(prov);
        setSelectedProv(provJSON);
        setDistricts([]);
        try {
            const res = await vnProvincesApi.get(vnpEndpoints["districts"], {
                params: {
                    provinceId: provJSON.id,
                    size: 999,
                }
            });
            setDistricts(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelectDist = async (dist: string) => {
        const distJSON = JSON.parse(dist);
        setSelectedDist(distJSON);
    }

    return (
        <div className="flex flex-col gap-y-4">
            <h2 className="font-semibold text-lg">Thành phố - Tỉnh thành</h2>
            <Select onValueChange={(value) => handleSelectProv(value)}>
                <SelectTrigger className="dark:bg-oupia-sub">
                    <SelectValue placeholder="-- Chọn tên thành phố --" />
                </SelectTrigger>
                <SelectContent>
                    {provinces.map((prov) => {
                        return (<SelectItem
                            key={prov.id}
                            value={JSON.stringify(prov)}>
                            {prov.name}
                        </SelectItem>)
                    })}
                </SelectContent>
            </Select>
            <Separator />
            <h2 className="font-semibold text-lg">Quận - Huyện</h2>
            <Select defaultValue={JSON.stringify(selectedDist) ?? ""} onValueChange={(value) => handleSelectDist(value)}>
                <SelectTrigger className="dark:bg-oupia-sub">
                    <SelectValue placeholder="-- Chọn quận / huyện --" />
                </SelectTrigger>
                <SelectContent>
                    {districts.length > 0 ? districts.map((dist) => {
                        return (<SelectItem
                            key={dist.id}
                            value={JSON.stringify(dist)}>
                            {dist.name}
                        </SelectItem>)
                    }) : <h4 className="text-sm text-muted-foreground text-center p-2">
                        Chưa có dữ liệu
                    </h4>}
                </SelectContent>
            </Select>
        </div>
    )
}

export default LocationFilter