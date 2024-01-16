"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { Image as image } from '@/interfaces/Image'
import "./style.css";
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Thumb } from './asset-carousel-thumbs-button'
import { useAssetImageContext } from '@/contexts/view-asset-image'

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
    images: image[]
}

const AssetCarousel: React.FC<PropType> = (props) => {

    const { imageIndex } = useAssetImageContext();

    const { options, images } = props
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])


    useEffect(() => {
        setSelectedIndex(imageIndex);
        if (emblaMainApi) {
            emblaMainApi.scrollTo(imageIndex);
        }
    }, [imageIndex, emblaMainApi])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect)
        emblaMainApi.on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    return (
        <div className="embla h-screen grid grid-rows-4 py-4 relative">
            <div className="absolute top-0 left-0 z-20">
                <span className="font-bold text-xl">{selectedIndex + 1} / {images.length} hình ảnh</span>
            </div>
            <div className="row-span-3 h-full relative">
                <Button variant={"ghost"}
                    className="hidden lg:flex justify-center items-center absolute left-8 top-1/2 -translate-y-1/2 rounded-full border-border border w-10 h-10 p-0 z-20"
                    disabled={selectedIndex === 0}
                    onClick={() => {
                        if (emblaMainApi) {
                            emblaMainApi.scrollTo(selectedIndex - 1);
                        }
                    }}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Previous slide</span>
                </Button>
                <div className="embla__viewport h-full" ref={emblaMainRef}>
                    <div className="embla__container touch-pan-y flex h-full relative ">
                        {images.map((image, index) => (
                            <div className="embla__slide relative flex justify-center items-center" key={index}>
                                <Image
                                    width="500"
                                    height="500"
                                    className={`${index !== 0 && "ml-8"} lg:ml-0 w-auto h-fit rounded-lg md:h-full`}
                                    src={image.url}
                                    alt="Asset Image"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <Button variant={"ghost"}
                    className="lg:flex justify-center items-center absolute right-8 top-1/2 -translate-y-1/2 rounded-full border-border border w-10 h-10 p-0 z-20"
                    disabled={selectedIndex + 1 === images.length}
                    onClick={() => {
                        if (emblaMainApi) {
                            emblaMainApi.scrollTo(selectedIndex + 1);
                        }
                    }}>
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Previous slide</span>
                </Button>
            </div>
            <div className="embla-thumbs flex items-center justify-center">
                <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                    <div className="embla-thumbs__container items-center justify-center">
                        {images.map((image, index) => (
                            <Thumb
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                imgSrc={image.url}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AssetCarousel
