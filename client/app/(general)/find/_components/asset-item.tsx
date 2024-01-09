"use client"

import { Asset } from '@/interfaces/Asset';
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { numberToCurrency } from '@/utils/priceConvert';

const AssetItem = ({ asset }: { asset: Asset }) => {
    const [api, setApi] = React.useState<any>()
    const [isHover, setIsHover] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(0);
    const [_, setCount] = useState<number>(0);

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
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="w-full rounded border-border flex flex-col gap-2 aspect-square">
            <Carousel setApi={setApi} className="w-full relative">
                <CarouselContent>
                    {asset.imageList.map((image, index) => (
                        <CarouselItem key={index}>
                            <Link href={`/find/${asset.slug}`} >
                                <Image src={image.url} width={320} height={320} alt='AssetImage' className="w-full rounded aspect-16/15" />
                            </Link>
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
            <Link href={`/find/${asset.slug}`}>
                <h2 className="text-sm text-gray-600 dark:text-gray-400 uppercase truncate">{asset.location}</h2>
                <h1 className="text-lg font-bold font-montserrat">{asset.name}</h1>
                <h3 className="text-sm text-primary-500 font-semibold">{asset.price && numberToCurrency(asset.price)}</h3>
            </Link>
        </div>

    );
};

export default AssetItem;
