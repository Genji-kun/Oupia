"use client"

import React, { useEffect } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useFindAssetContext } from '@/contexts/find-asset-context'
import { vnProvincesApi } from '@/configs/axiosInstance'
import { vnpEndpoints } from '@/configs/axiosEndpoints'
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

const LocationFilter = () => {

    const { provinces, setProvinces, selectedProv, setSelectedProv, districts, setDistricts, setSelectedDist } = useFindAssetContext();

    useEffect(() => {
        if (provinces.length === 0) {
            handleGetProvs();
        }
    }, []);

    // Fetch Province Data
    const handleGetProvs = async () => {
        try {
            const res = await vnProvincesApi.get(vnpEndpoints["provinces"]);
            setProvinces(res.data.results);
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch District Data
    const handleSelectProv = async (id: number) => {
        setDistricts([]);
        try {
            const url = vnpEndpoints.provId(id);
            const res = await vnProvincesApi.get(url);
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
                            value={prov.id.toString()}>
                            {prov["full_name"]}
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
                            value={dist.id.toString()}>
                            {dist["full_name"]}
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