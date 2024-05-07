"use client"

import React, { useEffect } from 'react'
import { useFindAssetContext } from '@/contexts/find-asset-context'
import { vnProvincesApi } from '@/configs/axiosInstance'
import { vnpEndpoints } from '@/configs/axiosEndpoints'
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

const LocationFilter = () => {

    const { provinces, setProvinces, setSelectedProv, districts, setDistricts, setSelectedDist } = useFindAssetContext();

    useEffect(() => {
        if (provinces.length === 0) {
            handleGetProvs();
        }
    }, []);

    // Fetch Province Data
    const handleGetProvs = async () => {
        try {
            const res = await vnProvincesApi.get(vnpEndpoints["provinces"], {
                params: {
                    limit: -1,
                }
            });
            setProvinces(res.data.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch District Data
    const handleSelectProv = async (code: number) => {
        setDistricts([]);
        try {
            const res = await vnProvincesApi.get(vnpEndpoints["getDistrictsByProv"], {
                params: {
                    provinceCode: code,
                    limit: -1
                }
            });
            setSelectedProv(res.data);
            setDistricts(res.data.districts);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelectDist = async (id: number) => {
        try {
            const url = vnpEndpoints.distId(id);
            const res = await vnProvincesApi.get(url);
            setSelectedDist(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col gap-y-4">
            <h2 className="font-semibold text-lg">Thành phố - Tỉnh thành</h2>
            <Select onValueChange={(value) => handleSelectProv(Number(value))}>
                <SelectTrigger className="dark:bg-oupia-sub">
                    <SelectValue placeholder="-- Chọn tên thành phố --" />
                </SelectTrigger>
                <SelectContent>
                    {provinces.map((prov) => {
                        return (<SelectItem
                            key={prov.id}
                            value={prov.code}>
                            {prov["name_with_type"]}
                        </SelectItem>)
                    })}
                </SelectContent>
            </Select>
            <Separator />
            <h2 className="font-semibold text-lg">Quận - Huyện</h2>
            <Select onValueChange={(value) => handleSelectDist(Number(value))}>
                <SelectTrigger className="dark:bg-oupia-sub">
                    <SelectValue placeholder="-- Chọn quận / huyện --" />
                </SelectTrigger>
                <SelectContent>
                    {districts.length > 0 ? districts.map((dist) => {
                        return (<SelectItem
                            key={dist.id}
                            value={dist.code}>
                            {dist["name_with_type"]}
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