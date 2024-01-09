import { Button } from '@/components/ui/button';
import EmblaCarousel from '@/components/ui/carousel/embla-carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { EmblaOptionsType } from 'embla-carousel'
import { Image as image } from '@/interfaces/Image';
import Image from 'next/image';
import React from 'react';

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 10
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const AssetImageList = ({ images }: { images: image[] }) => {

    return (
        <div className="grid grid-cols-4 xl:grid-cols-3 gap-6 relative">
            <Dialog>
                <div className="col-span-2 xl:col-span-2">
                    <DialogTrigger asChild>
                        <Image src={images[0].url} alt="Asset Image 1" width={500} height={500} className="w-full aspect-video h-full rounded-lg object-cover hover:cursor-pointer" loading='lazy'></Image>
                    </DialogTrigger>
                </div>
                <div className="col-span-2 xl:col-span-1 flex-col gap-6 flex">
                    <div className="w-full h-full">
                        <DialogTrigger asChild>
                            <Image src={images[1].url} alt="Asset Image 2" width={500} height={500} className="rounded-lg object-cover aspect-3/2 hover:cursor-pointer w-full" loading='lazy'></Image>
                        </DialogTrigger>
                    </div>
                    <div className="w-full h-full">
                        <DialogTrigger asChild>
                            <Image src={images[2].url} alt="Asset Image 3" width={500} height={500} className="rounded-lg object-cover  aspect-3/2 hover:cursor-pointer w-full" loading='lazy'></Image>
                        </DialogTrigger>
                    </div>
                </div>
                {images.length > 3 &&
                    <DialogTrigger asChild>
                        <Button className="styled-button absolute bottom-2 right-2">Xem tất cả hình ảnh</Button>
                    </DialogTrigger>
                }
                <DialogContent className="w-full h-screen images-view">
                    <EmblaCarousel slides={SLIDES} options={OPTIONS} images={images} />
                </DialogContent>
            </Dialog>
        </div>

    );
};

export default AssetImageList;