"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useDebounce } from '@/hooks/useDebounce';
import axios from 'axios';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function TagsInput() {

    const [query, setQuery] = useState("");
    const [tags, setTags] = useState<any[]>([]);
    const [selectedTags, setSelectedTags] = useState<any[]>([]);

    const [isHidden, setIsHidden] = useState<boolean>(true);

    const fetchData = useDebounce(async (searchQuery: string) => {
        if (searchQuery) {
            try {
                const res = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${searchQuery}`);
                const data = res.data.objects.map((obj: any) => obj.package);
                setTags(data);
                setIsHidden(false);
            } catch (error) {
                console.log(error);
            }
        } else {
            setIsHidden(true);
        }

    }, 500);

    const handleSelectTag = (tag: any) => {
        setSelectedTags((prevTags) => [...prevTags, tag]);
        setQuery("");
        setIsHidden(true);
    }

    const handleRemoveTag = (name: string) => {
        setSelectedTags(selectedTags.filter((tag) => tag.name !== name));
    }

    useEffect(() => {
        fetchData(query);
        return () => {
            fetchData.cancel();
        }
    }, [query, fetchData])

    return (
        <div className="relative space-y-2" >
            {selectedTags.length > 0 &&
                <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag, index) => {
                        return <div key={index} className="flex items-center gap-2 bg-primary/20 text-primary border border-primary-500 rounded-lg px-3 py-2">
                            <span>{tag.name}</span>
                            <Button
                                variant={"ghost"}
                                className="rounded-full w-fit h-fit p-1"
                                onClick={() => handleRemoveTag(tag.name)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    })}
                </div>
            }
            <Input
                value={query}
                onChange={(evt) => { setQuery(evt.target.value) }}
                onFocus={() => { query && tags.length > 0 && setIsHidden(false) }}
                placeholder='Điền nội dung tag đính kèm bài viết...' />
            {
                !isHidden &&
                <ScrollArea className="absolute z-10 bottom-2 h-72 w-full rounded border border-t-0 rounded-t-none py-2">
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

export default TagsInput;