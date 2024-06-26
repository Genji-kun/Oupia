"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { RECAPTCHA_SITE_KEY } from '@/lib/constants/SettingSystem';
import { ILandlordInfo } from '@/lib/types/interfaces/User';
import { cn } from '@/lib/utils';
import { InfoIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';

const AssetInfoDialog = ({ data }: { data: ILandlordInfo }) => {

    const [isVerified, setIsVerified] = useState(false);
    const [textExpanded, setTextExpanded] = useState(false);
    const [open, setOpen] = useState(false);


    return (
        <>
            <Button variant={"normal"} onClick={() => setOpen(true)} className="flex items-center gap-1.5">
                <InfoIcon className='w-4 h-4' />
                <span>Thông tin nhà trọ</span>
            </Button>
            {
                open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-50 bg-black/70 dark:bg-accent/70 flex justify-center items-center">
                    <div onClick={(evt) => evt.stopPropagation()} className="w-full lg:w-1/2 transition-all bg-background px-8 py-6 rounded-lg flex flex-col gap-4 relative">
                        <Button onClick={() => setOpen(false)} variant={"ghost"} className='p-1 w-fit h-fit absolute top-4 right-4'>
                            <X className="w-4 h-4 top-2 right-2" />
                        </Button>
                        <div>
                            <h3 className='font-semibold text-xl uppercase'>Thông tin nhà trọ</h3>
                            <p className='w-3/4 truncate text-muted-foreground'>Xem thông tin chi tiết của &quot;{data.assetName}&quot;</p>
                        </div>
                        <Separator />
                        <ScrollArea className='h-[75vh]'>
                            <div className='flex flex-col gap-6'>
                                <div className='space-y-3'>
                                    <h5 className='text-lg'>Mô tả, giới thiệu nhà trọ</h5>
                                    <p className={cn("text-muted-foreground text-sm", !textExpanded && "line-clamp-5")}>
                                        {data.assetDescription.split('\n').map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </p>
                                    <span className="cursor-pointer text-sm" onClick={() => setTextExpanded((prev) => !prev)}>{textExpanded ? "Ẩn bớt" : "Xem thêm"}</span>
                                </div>
                                <div className='space-y-2'>
                                    <h5 className='text-lg'>Tiện ích nhà trọ</h5>
                                    <div className="flex gap-2 flex-wrap">
                                        {
                                            data.amenities?.map((amenity, index: number) => {
                                                return <React.Fragment key={index}>
                                                    <Badge className="border text-white bg-primary py-1 px-4">
                                                        <div className="flex items-center gap-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lucide lucide-circle-check-big"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>                                            <span className="text-base">
                                                                {amenity.amenityName}
                                                            </span>
                                                        </div>
                                                    </Badge>
                                                </React.Fragment>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <h5 className='text-lg leading-0'>Giấy phép kinh doanh</h5>
                                    <p className='text-sm text-muted-foreground'>Hãy xác nhận trước khi xem thông tin.</p>
                                    <ReCAPTCHA className='mx-auto mt-4'
                                        sitekey={RECAPTCHA_SITE_KEY ?? ""}
                                        onChange={(token) => setIsVerified(!!token)} />

                                    {
                                        isVerified && <Image src={data.businessLicense}
                                            alt="Bussiness License Image"
                                            width={1000}
                                            height={1000}
                                            className="object-cover w-[95%] mx-auto my-10" />
                                    }
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            }
        </>
    )
}

export default AssetInfoDialog;