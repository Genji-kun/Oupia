"use client"

import { Asset } from '@/interfaces/Asset';
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const AssetItem = ({ asset }: { asset: Asset }) => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [isHover, setIsHover] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(0);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        if (!api) {
            return
        }
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div className="w-full rounded border-border flex flex-col gap-2 aspect-square">
            <Carousel setApi={setApi} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="w-full relative">
                <CarouselContent>
                    {asset.imageList.map((image, index) => (
                        <CarouselItem key={index}>
                            <Image src={image.url} width={320} height={320} alt='AssetImage' className="w-full rounded aspect-16/15" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className={cn("absolute left-2 hidden", isHover && "flex")} />
                <CarouselNext className={cn("absolute right-2 hidden", isHover && "flex")} />
                <div className="flex gap-1 absolute bottom-2 left-1/2 -translate-x-1/2">
                    {asset.imageList.map((_, index) => (
                        <div key={index} className={cn("bg-border/50 rounded-full w-2 h-2", current === index + 1 && "bg-primary-500")} />
                    ))}
                </div>
            </Carousel>
            {asset.name}
        </div >

    );
};

export default AssetItem;
