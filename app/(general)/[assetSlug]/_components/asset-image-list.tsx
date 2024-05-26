"use client"

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { EmblaOptionsType } from 'embla-carousel'
import { Image as image } from '@/lib/types/interfaces/Image';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAssetImageContext } from '@/contexts/view-asset-image';
import AssetCarousel from './asset-carousel';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import { useAssetDetailContext } from '@/contexts/asset-detail-context';

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 10
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const AssetImageList = () => {

    const { setImageIndex } = useAssetImageContext();
    const { asset, isFetching } = useAssetDetailContext();

    const [mousePosition, setMousePosition] = useState<any>({ x: 0, y: 0 });
    const [cursorVariants, setCursorVariants] = useState<string>("default");


    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 0,
            transition: { duration: 0.05 }
        },
        hover: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1.2,
            transition: { duration: 0.05 }
        },
    }

    useEffect(() => {
        const mouseMove = (evt: any) => {
            setMousePosition({ x: evt.clientX, y: evt.clientY })
        }
        window.addEventListener("mousemove", mouseMove);
        return () => { window.removeEventListener("mousemove", mouseMove) }
    }, [])


    return (
        <>
            <AnimatePresence>
                <motion.div
                    variants={variants}
                    initial="default"
                    animate={cursorVariants}
                    exit="default"
                    className="bg-background p-2 rounded-full flex items-center justify-center fixed top-0 left-0 z-20 pointer-events-none">
                    <ArrowUpRight size="24" />
                </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-4 xl:grid-cols-3 gap-6 relative">
                <Dialog>
                    <div className="col-span-2 xl:col-span-2">
                        <DialogTrigger asChild>
                            <Image
                                onMouseEnter={() => { setCursorVariants("hover") }}
                                onMouseLeave={() => { setCursorVariants("default") }}
                                onClick={() => setImageIndex(0)} src={asset.images[0]}
                                alt="Asset Image 1"
                                width={500}
                                height={500}
                                className="w-full aspect-video h-full rounded-lg object-cover hover:cursor-none"
                                loading='lazy'></Image>
                        </DialogTrigger>
                    </div>
                    <div className="col-span-2 xl:col-span-1 flex-col gap-6 flex">
                        <div className="w-full h-full">
                            <DialogTrigger asChild>
                                <Image
                                    onMouseEnter={() => { setCursorVariants("hover") }}
                                    onMouseLeave={() => { setCursorVariants("default") }}
                                    onClick={() => setImageIndex(1)}
                                    src={asset.images[1]}
                                    alt="Asset Image 2"
                                    width={500}
                                    height={500}
                                    className="rounded-lg object-cover aspect-3/2  hover:cursor-none w-full"
                                    loading='lazy'></Image>
                            </DialogTrigger>
                        </div>
                        <div className="w-full h-full">
                            <DialogTrigger asChild>
                                <Image
                                    onMouseEnter={() => { setCursorVariants("hover") }}
                                    onMouseLeave={() => { setCursorVariants("default") }}
                                    onClick={() => setImageIndex(2)}
                                    src={asset.images[2]}
                                    alt="Asset Image 3" width={500}
                                    height={500}
                                    className="rounded-lg object-cover aspect-3/2  hover:cursor-none w-full"
                                    loading='lazy'></Image>
                            </DialogTrigger>
                        </div>
                    </div>
                    {asset.images.length > 3 &&
                        <DialogTrigger asChild>
                            <Button onClick={() => setImageIndex(0)} className="styled-button absolute bottom-2 right-2">Xem tất cả hình ảnh</Button>
                        </DialogTrigger>
                    }
                    <DialogContent className="w-full h-screen images-view">
                        <AssetCarousel slides={SLIDES} options={OPTIONS} images={asset.images} />
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};

export default AssetImageList;