"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUploadContext } from '@/contexts/upload-context';
import { useDebounce } from '@/hooks/useDebounce';
import { Amenity } from '@/interfaces/Tags';
import axios from 'axios';
import { CornerDownLeft, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

function AmenityInput() {

    const { setAmenities } = useUploadContext();
    const [query, setQuery] = useState("");
    const [tags, setTags] = useState<any[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);

    const inputRef = useRef<HTMLDivElement>(null);

    const fetchData = useDebounce(async (searchQuery: string) => {
        // if (searchQuery) {
        //     try {
        //         const res = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${searchQuery}`);
        //         const data = res.data.objects.map((obj: any) => obj.package);
        //         setTags(data);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    }, 500);

    const handleSelectTag = (tag: Amenity) => {
        setAmenities((prev) => [...prev, tag]);
        setQuery("");
        setShowResults(false);
    }

    // const handleRemoveTag = (name: string) => {
    //     setSelectedTags(selectedTags.filter((tag) => tag.name !== name));
    // }

    const handleClickOutSide = (evt: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(evt.target as Node)) {
            setQuery("");
            setShowResults(false);
        }
    }

    const handleKeyDown = (evt: KeyboardEvent) => {
        if (evt.key === "Enter") {
            if (query.trim().length > 6) {
                setAmenities((prev) => [...prev, { amenityName: query }]);
                setQuery("");
                setShowResults(false);
            }
        }
        if (evt.key === "Escape") {
            setQuery("");
            setShowResults(false);
        }
    }

    const handleAddNewTag = () => {
        setAmenities((prev) => [...prev, { amenityName: query }]);
        setQuery("");
        setShowResults(false);
    }

    useEffect(() => {
        setShowResults(tags.length > 0);
    }, [tags])

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
                    value={query}
                    onChange={(evt) => { setQuery(evt.target.value) }}
                    placeholder='Điền nội dung tag đính kèm bài viết...' />

                {
                    query.trim().length > 6 &&
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={"ghost"}
                                    onClick={handleAddNewTag}
                                    className=" absolute w-fit h-fit rounded-full p-2 top-1 right-1.5 dark:hover:bg-background">
                                    <CornerDownLeft className="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="mb-1">
                                <p>Thêm HashTag mới</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                }
            </div>
            {
                showResults &&
                <ScrollArea className="absolute z-10 bottom-2 max-h-72 w-full rounded border border-t-0 rounded-t-none py-2">
                    <div className="flex flex-col px-2">
                        {tags.map((tag, index) => {
                            return (
                                <>
                                    <Button
                                        variant="ghost"
                                        key={index}
                                        className="justify-start"
                                        onClick={() => handleSelectTag(tag)}>
                                        {tag.name}
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

export default AmenityInput;