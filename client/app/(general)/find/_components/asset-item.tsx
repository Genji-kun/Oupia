"use client"

import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { numberToCurrency } from '@/utils/priceConvert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BiArea } from 'react-icons/bi';
import { UserRound, UsersRoundIcon } from 'lucide-react';

const AssetItem = ({ asset }: { asset: any }) => {
    const [api, setApi] = React.useState<any>()
    const [isHover, setIsHover] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(0);
    const [_, setCount] = useState<number>(0);

    useEffect(() => {
        if (!api) {
            return;
        }
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="w-full rounded-lg border-border flex flex-col gap-1">
            <Carousel setApi={setApi} className="w-full relative">
                <CarouselContent>
                    {asset.images.map((image: string, index: number) => (
                        <CarouselItem key={index}>
                            <Link href={`/${asset.assetSlug}`} className="w-full">
                                <Image src={image} width={500} height={500} alt='AssetImage' className="w-full rounded-lg aspect-[10/9]" />
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className={cn("absolute left-2 hidden", isHover && "flex")} />
                <CarouselNext className={cn("absolute right-2 hidden", isHover && "flex")} />
                <div className="flex gap-1 absolute bottom-2 left-1/2 -translate-x-1/2">
                    {asset.images.map((_: any, index: number) => (
                        <div key={index} className={cn("bg-border/50 rounded-full w-2 h-2", current === index + 1 && "bg-primary-500")} />
                    ))}
                </div>
            </Carousel>
            <Link href={`/${asset.assetSlug}`} className="w-full">
                <h2 className="text-xs text-muted-foreground uppercase truncate">{asset.fullLocation}</h2>
                <h1 className="leading-0 font-medium font-montserrat line-clamp-1 mt-1">{asset.assetName}</h1>
                <div className='flex items-center justify-between dark:text-muted-foreground'>
                    <h3 className="leading-0 text-primary font-medium">{asset.price && numberToCurrency(asset.price)}</h3>
                    <div className="flex items-center gap-1">
                        <BiArea className="w-4 h-4"/>
                        <span className="mr-2 text-sm">{asset.area}m²</span>
                        <UsersRoundIcon className="w-4 h-4"/>
                        <span className="text-sm">	&#8804; {asset.maxPeople}</span>
                    </div>
                </div>
            </Link>
        </div>

    );
};

export default AssetItem;
