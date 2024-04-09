"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useUploadContext } from '@/contexts/upload-context';
import { useDebounce } from '@/hooks/useDebounce';
import axios from 'axios';
import { isUndefined } from 'lodash-es';
import React, { useEffect, useRef, useState } from 'react'

function LocationInput() {

    const { setLocationTag, locationTag } = useUploadContext();
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
            setLocationTag({
                fullLocation: data.result.formatted_address,
                latitute: data.result.geometry.location.lat,
                longtitude: data.result.geometry.location.lng,
            });
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

    return (
        <div className="relative space-y-2 w-full" ref={inputRef}>

            <div className="relative">
                <Input
                    disabled={!isUndefined(locationTag)}
                    value={query}
                    onChange={(evt) => { setQuery(evt.target.value) }}
                    placeholder='Điền nội dung tag đính kèm bài viết...' />
            </div>
            {
                showResults &&
                <ScrollArea className="absolute z-10 bottom-2 max-h-72 w-full rounded border border-t-0 rounded-t-none py-2">
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
        </div >
    )
}

export default LocationInput;