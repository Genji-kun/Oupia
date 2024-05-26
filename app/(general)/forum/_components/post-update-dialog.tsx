"use client"

import { PostResponse } from '@/lib/types/interfaces/Post'
import React, { useEffect, useRef, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Amenity, TagLocation, TagPrice } from '@/lib/types/interfaces/Tags';
import { CircleDollarSignIcon, CornerDownLeft, MapPin, ThumbsUp, X } from 'lucide-react';
import { formatCurrency } from '@/utils/priceConvert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useDebounce } from '@/hooks/useDebounce';
import { usePostUpdateContext } from '@/contexts/post-update-context';


function PostUpdateDialog({ post }: { post: PostResponse }) {

    const { updatePost, setUpdatePost } = usePostUpdateContext();

    const [selectedTagType, setSelectedTagType] = useState<string>("price");
    const [amenities, setAmenities] = useState<Amenity[]>([]);
    const [tagPrice, setTagPrice] = useState<TagPrice | undefined>();
    const [tagLocation, setTagLocation] = useState<TagLocation | undefined>();

    useEffect(() => {
        if (post.amenities && post.amenities.length > 0) {
            const newAmenities = post.amenities.map(amenity => ({ amenityName: amenity }));
            setAmenities(newAmenities);
        }
        if (post.fullLocation && post.locationLat && post.locationLong) {
            setTagLocation({
                fullLocation: post.fullLocation,
                latitude: post.locationLat,
                longtitude: post.locationLong
            });
        }
        if (post.tagPrice) {
            setTagPrice(post.tagPrice);
        }
        setUpdatePost((prev: PostResponse) => {
            return { ...prev, postType: post.postType }
        })
    }, [])

    useEffect(() => {
        if (amenities.length > 0) {
            setUpdatePost((prev: any) => { return { ...prev, amenities: amenities } })
        } else {
            setUpdatePost((prev: any) => {
                const { amenities, ...newPost } = prev;
                return newPost;
            })
        }
    }, [amenities, setUpdatePost])

    useEffect(() => {
        if (tagPrice) {
            setUpdatePost((prev: any) => { return { ...prev, tagPrice: tagPrice } })
        } else {
            setUpdatePost((prev: any) => {
                const { tagPrice, ...newPost } = prev;
                return newPost;
            })
        }
    }, [tagPrice, setUpdatePost])

    useEffect(() => {
        if (tagLocation) {
            setUpdatePost((prev: any) => { return { ...prev, tagLocation: tagLocation } })
        } else {
            setUpdatePost((prev: any) => {
                const { tagLocation, ...newPost } = prev;
                return newPost;
            })
        }
    }, [tagLocation, setUpdatePost])

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


    const handleFormChange = (field: string, value: any) => {
        setUpdatePost((current: any) => {
            return {
                ...current,
                [field]: value,
            }
        })
    }

    const handleRemoveAmenity = (name: string) => {
        setAmenities(amenities.filter((tag) => tag.amenityName !== name));
    }

    const handlePostTypeChange = (value: string) => {
        switch (value) {
            case "POST_COMMON":
                setAmenities([]);
                setTagPrice(undefined);
                setTagLocation(undefined);
                break;
            case "POST_FIND":
                break;
            case "POST_RENT":
                break;
            default:
                break;
        }
        setUpdatePost((current: any) => { return { ...current, postType: value } })
    }


    return (
        <Accordion type="multiple" className="w-full">
            <AccordionItem value="type">
                <AccordionTrigger>
                    <span className="font-semibold text-lg">Loại bài viết</span>
                </AccordionTrigger>
                <AccordionContent>
                    <Select defaultValue={updatePost.postType} onValueChange={(value) => handlePostTypeChange(value)}>
                        <SelectTrigger className="dark:bg-oupia-sub">
                            <SelectValue placeholder="Bạn đăng bài viết này với mục đích gì?" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="POST_COMMON">Đăng bài viết thông thường</SelectItem>
                            <SelectItem value="POST_FIND">Tìm kiếm căn hộ</SelectItem>
                            <SelectItem value="POST_RENT">Cho thuê</SelectItem>
                        </SelectContent>
                    </Select>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="infomation">
                <AccordionTrigger>
                    <span className="font-semibold text-lg">Nội dung bài viết</span>
                </AccordionTrigger>
                <AccordionContent>
                    <Textarea
                        rows={5}
                        placeholder='Nhập nội dung...'
                        className="dark:bg-oupia-sub"
                        value={updatePost.postContent}
                        name="postContent"
                        onChange={(evt) => handleFormChange(evt.target.name, evt.target.value)}
                    />
                </AccordionContent>
            </AccordionItem>
            {
                updatePost.postType !== "POST_COMMON" && (
                    <AccordionItem value="amenities">
                        <AccordionTrigger>
                            <span className="font-semibold text-lg">{updatePost.postType === "POST_FIND" ? "Tiện ích yêu cầu" : "Tiện ích của căn hộ"}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                <div className="flex flex-wrap gap-2">
                                    {amenities.length > 0 && amenities.map((tag, index) => {
                                        return <div key={index} className="flex items-center gap-1.5 bg-primary/20 text-primary border border-primary-500 rounded-lg px-2 py-1.5 h-fit">
                                            <ThumbsUp className="w-4 h-4" />
                                            <span>{tag.amenityName}</span>
                                            <Button
                                                variant={"ghost"}
                                                className="rounded-full w-fit h-fit p-1 ml-1"
                                                onClick={() => handleRemoveAmenity(tag.amenityName)}>
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    })}
                                </div>
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
                                                        <p>Thêm tiện ích mới</p>
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
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )
            }
            {
                updatePost.postType !== "POST_COMMON" &&
                (
                    <AccordionItem value="tag">
                        <AccordionTrigger>
                            <span className="font-semibold text-lg">Các tag đính kèm trong bài đăng</span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="relative space-y-2">
                                {(tagPrice || tagLocation) &&
                                    <div className="flex flex-wrap gap-2">

                                        {tagPrice &&
                                            <div className="flex items-center gap-1.5 bg-primary/20 text-primary border border-primary-500 rounded-lg px-3 py-1.5 h-fit">
                                                <CircleDollarSignIcon className="w-4 h-4" />
                                                <span>{formatCurrency(tagPrice.minPrice)} - {formatCurrency(tagPrice.maxPrice)}đ</span>
                                                <Button
                                                    variant={"ghost"}
                                                    className="rounded-full w-fit h-fit p-1 ml-1"
                                                    onClick={() => setTagPrice(undefined)}>
                                                    <X className="w-4 h-4" />
                                                </Button>

                                            </div>
                                        }
                                        {tagLocation &&
                                            <div className="flex items-center gap-1.5 bg-primary/20 text-primary border border-primary-500 rounded-lg px-3 py-1.5 h-fit">
                                                <MapPin className="w-4 h-4" />
                                                <span>{tagLocation.fullLocation}</span>
                                                <Button
                                                    variant={"ghost"}
                                                    className="rounded-full w-fit h-fit p-1 ml-1"
                                                    onClick={() => setTagLocation(undefined)}>
                                                    <X className="w-4 h-4" />
                                                </Button>

                                            </div>
                                        }
                                    </div>
                                }
                                <div className="flex gap-2">
                                    <Select defaultValue={selectedTagType} onValueChange={value => setSelectedTagType(value)}>
                                        <SelectTrigger className="w-[180px] dark:bg-oupia-sub">
                                            <SelectValue placeholder="Chọn tag đính kèm" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Loại tag đính kèm</SelectLabel>
                                                <SelectItem value="price">Giá tiền</SelectItem>
                                                <SelectItem value="location">Địa điểm</SelectItem>
                                                <SelectItem value="asset">Thông tin căn hộ</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {/* <>
                                {(() => {
                                    switch (selectedTagType) {
                                        case "amenity":
                                            return <AmenityInput />
                                        case "price":
                                            return <PriceInput />
                                        case "location":
                                            return <LocationInput />
                                        case "asset":
                                        default:
                                            return <></>
                                    }
                                })()}
                            </> */}
                                </div>
                            </div >
                        </AccordionContent>
                    </AccordionItem>
                )
            }
            {post.images && post.images.length > 0 && (
                <AccordionItem value="images">
                    <AccordionTrigger>
                        <span className="font-semibold text-lg">Hình ảnh</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-wrap gap-2 items-center pt-4">
                            {post.images.map((image, index) => (
                                <div key={index} className="col-span-1 relative ">
                                    <Image width={500} height={500} className="rounded-lg object-cover w-32 aspect-square" src={image} alt={image} />
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            )}
        </Accordion>
    )
}

export default PostUpdateDialog