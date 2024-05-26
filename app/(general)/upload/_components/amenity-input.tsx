"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUploadContext } from '@/contexts/upload-context';
import { useDebounce } from '@/hooks/useDebounce';
import { Amenity } from '@/lib/types/interfaces/Tags';
import { CornerDownLeft, ThumbsUp, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

function AmenityInput() {

    const { amenities, setAmenities } = useUploadContext();
    const [query, setQuery] = useState("");
    const [tags, setTags] = useState<any[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);

    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setShowResults(tags.length > 0);
    }, [tags])

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

    const handleRemoveAmenity = (name: string) => {
        setAmenities(amenities.filter((tag) => tag.amenityName !== name));
    }

    return (
        <div className="relative space-y-2 w-full" ref={inputRef}>
            {
                amenities.length > 0 &&
                <div className="flex flex-wrap gap-2">
                    {
                        amenities.map((tag, index) => {
                            return <div key={index} className="flex items-center gap-1.5 bg-primary/20 text-primary border border-primary-500 rounded-lg h-fit px-3 py-1.5">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{tag.amenityName}</span>
                                <Button
                                    variant={"ghost"}
                                    className="rounded-full w-fit h-fit p-1"
                                    onClick={() => handleRemoveAmenity(tag.amenityName)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        })}
                </div>
            }
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
                                <p>Thêm tiện ích</p>
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