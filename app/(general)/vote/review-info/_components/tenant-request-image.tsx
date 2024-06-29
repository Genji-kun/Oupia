import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Image as ImageItem } from '@/lib/types';
import { cn } from '@/lib/utils'
import { ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const TenantRequestImage = ({ images }: { images: ImageItem[] }) => {
    const [selectedImageIndex, setSelectedIamgeIndex] = useState(0)
    const [open, setOpen] = useState(false)
    const [zoom, setZoom] = useState<number>(1)

    useEffect(() => {
        if (!open) {
            setZoom(1)
            setSelectedIamgeIndex(0)
        }
    }, [open])

    const handleSelectImage = (index: number) => {
        setOpen(true)
        setSelectedIamgeIndex(index)
    }

    return (
        <>
            <>
                {
                    (() => {
                        switch (images.length) {
                            case 1:
                                return (
                                    <div className='aspect-[25/9] w-full'>
                                        <Image onClick={() => handleSelectImage(0)} src={images[0].url} alt="Blog Image" className='object-cover cursor-pointer' width={1000} height={1000} />
                                    </div>
                                )
                            case 2:
                                return (
                                    <div className='aspect-[25/9] w-full grid grid-cols-2 gap-1.5'>
                                        <Image onClick={() => handleSelectImage(0)} src={images[0].url} alt="Blog Image" className='object-cover aspect-square cursor-pointer' width={1000} height={1000} />
                                        <Image onClick={() => handleSelectImage(1)} src={images[1].url} alt="Blog Image" className='object-cover aspect-square cursor-pointer' width={1000} height={1000} />
                                    </div>
                                )
                            case 3:
                                return (
                                    <div className='aspect-video w-full grid grid-cols-2 gap-1.5'>
                                        <Image onClick={() => handleSelectImage(0)} src={images[0].url} alt="Blog Image" className='object-cover h-full' width={1000} height={1000} />
                                        <div className="grid grid-rows-2 gap-1.5">
                                            <Image onClick={() => handleSelectImage(1)} src={images[1].url} alt="Blog Image" className='object-cover aspect-video cursor-pointer' width={1000} height={1000} />
                                            <Image onClick={() => handleSelectImage(2)} src={images[2].url} alt="Blog Image" className='object-cover aspect-video cursor-pointer' width={1000} height={1000} />
                                        </div>
                                    </div>
                                )
                            default:
                                return (
                                    <div className='aspect-[25/9] w-full grid grid-cols-2 gap-1.5'>
                                        <Image onClick={() => handleSelectImage(0)} src={images[0].url} alt="Blog Image" className='object-cover aspect-video cursor-pointer' width={1000} height={1000} />
                                        <Image onClick={() => handleSelectImage(1)} src={images[1].url} alt="Blog Image" className='object-cover aspect-video cursor-pointer' width={1000} height={1000} />
                                        <Image onClick={() => handleSelectImage(2)} src={images[2].url} alt="Blog Image" className='object-cover aspect-video cursor-pointer' width={1000} height={1000} />
                                        <div className="relative cursor-pointer" onClick={() => handleSelectImage(3)}>
                                            {
                                                images.length > 4 && <div className='absolute z-10 bg-black/20 dark:bg-black/50 inset-0 flex justify-center items-center'>
                                                    <span className='font-semibold text-4xl text-white'>+{images.length - 4}</span>
                                                </div>
                                            }
                                            <Image src={images[3].url} alt="Blog Image" className='object-cover aspect-video' width={1000} height={1000} />
                                        </div>
                                    </div>
                                )
                        }
                    })()
                }
            </>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='flex h-screen flex-col gap-2 border-none p-0 dark:bg-background/40'>
                    <div className='absolute left-2 top-2 z-10 flex gap-1'>
                        <Button
                            disabled={zoom > 1.5}
                            onClick={() => setZoom((prev) => prev + 0.1)}
                            className='p-2'
                            variant={'outline'}
                        >
                            <ZoomInIcon className='h-5 w-5' />
                        </Button>
                        <Button
                            disabled={zoom < 0.5}
                            onClick={() => setZoom((prev) => prev - 0.1)}
                            className='p-2'
                            variant={'outline'}
                        >
                            <ZoomOutIcon className='h-5 w-5' />
                        </Button>
                    </div>
                    <div className='flex-auto flex justify-center items-center bg-border dark:bg-background rounded-lg overflow-hidden'>
                        <Image src={images[selectedImageIndex].url} alt="Blog Image" className='object-cover w-fit h-[90%]' style={{ transform: `scale(${zoom})` }} width={1000} height={1000} />
                    </div>
                    <div className="flex gap-2 justify-center overflow-x-auto bg-border dark:bg-background p-2 rounded-lg">
                        {
                            images.map((item, index) => {
                                return <Image onClick={() => handleSelectImage(index)} src={item.url} alt="Blog Image" className={cn('w-20 h-20 object-cover cursor-pointer hover:opacity-100 rounded-lg', index === selectedImageIndex ? 'border-2 border-primary' : 'opacity-50')} width={1000} height={1000} />
                            })
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TenantRequestImage;
