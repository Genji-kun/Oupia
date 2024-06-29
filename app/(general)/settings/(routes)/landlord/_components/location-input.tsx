"use client"

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useDebounce } from '@/hooks/useDebounce';
import { ISubmitLandlordForm } from '@/lib/interfaces/Asset';
import axios from 'axios';
import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form';

function LocationInput({ form }: { form: UseFormReturn<ISubmitLandlordForm, any, undefined> }) {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);

    const inputRef = useRef<HTMLDivElement>(null);

    const fetchData = useDebounce(async (searchQuery: string) => {
        if (searchQuery) {
            try {
                const res = await axios.get(`https://rsapi.goong.io/Place/AutoComplete?input=${searchQuery}, Việt Nam&api_key=${process.env.NEXT_PUBLIC_GOONG_MAPS_API_KEY}&sessionToken=${localStorage.getItem("sessionToken")}`);
                const data = await res.data.predictions;
                if (data) {
                    setResults(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, 500);

    const geteocode = async (placeId: string) => {
        const res = await axios.get(`https://rsapi.goong.io/Place/Detail?place_id=${placeId}&api_key=${process.env.NEXT_PUBLIC_GOONG_MAPS_API_KEY}`);
        const data = await res.data;
        if (data) {
            form.setValue("assetInfo.fullLocation", data.result.formatted_address);
            form.setValue("assetInfo.locationLat", data.result.geometry.location.lat);
            form.setValue("assetInfo.locationLong", data.result.geometry.location.lng);
        }

    }


    const handleSelect = (evt: any) => {
        geteocode(evt.target.dataset.placeId);
        setQuery("");
        setShowResults(false);
    }


    const handleClickOutSide = (evt: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(evt.target as Node)) {
            setQuery("");
            setShowResults(false);
        }
    }

    const handleKeyDown = (evt: KeyboardEvent) => {
        if (evt.key === "Escape") {
            setQuery("");
            setShowResults(false);
        }
    }

    useEffect(() => {
        setShowResults(results.length > 0);
    }, [results])

    useEffect(() => {
        !query && setShowResults(false);
        document.addEventListener("mousedown", handleClickOutSide);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [query])

    useEffect(() => {
        fetchData(query);
        return () => {
            fetchData.cancel();
        }
    }, [query, fetchData])

    function handleRemoveLocation() {
        form.resetField("assetInfo.fullLocation");
        form.resetField("assetInfo.locationLat");
        form.resetField("assetInfo.locationLong");
    }

    const fullLocation = form.watch("assetInfo.fullLocation");

    return (
        <div className="relative space-y-2 w-full" ref={inputRef}>
            <FormField
                control={form.control}
                name="assetInfo.fullLocation"
                render={() => (
                    <FormItem>
                        <FormLabel className="text-base">Địa chỉ nhà trọ</FormLabel>
                        <FormControl>
                            <>
                                <div className="relative">
                                    <Input
                                        disabled={!!fullLocation}
                                        value={fullLocation ? fullLocation : query}
                                        onChange={(evt) => { setQuery(evt.target.value) }}
                                        placeholder='Nhập địa chỉ...'
                                        className="bg-accent dark:bg-oupia-base" />

                                    {
                                        fullLocation && <Button onClick={handleRemoveLocation} className="absolute right-3 top-1/2 -translate-y-1/2 w-fit h-fit p-1" variant={"destructive"}>
                                            <X className="w-3 h-3" />
                                        </Button>
                                    }

                                </div>
                                {
                                    showResults &&
                                    <ScrollArea className="absolute z-10 bottom-2 max-h-72 w-full rounded border border-t-0 rounded-t-none py-2 bg-accent dark:bg-oupia-base">
                                        <div className="flex flex-col px-2">
                                            {results.map((result, index) => {
                                                return (
                                                    <>
                                                        <Button
                                                            variant="ghost"
                                                            key={index}
                                                            className="justify-start"
                                                            onClick={(evt) => handleSelect(evt)} data-place-id={result.place_id}>
                                                            {result.description}
                                                        </Button>
                                                        <Separator />
                                                    </>

                                                );
                                            })}
                                        </div>
                                    </ScrollArea>
                                }
                            </>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div >
    )
}

export default LocationInput;