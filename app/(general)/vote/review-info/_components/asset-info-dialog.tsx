"use client"

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { RECAPTCHA_SITE_KEY } from '@/lib/constants/SettingSystem';
import { ITenantRequest } from '@/lib/interfaces/User';
import { cn } from '@/lib/utils';
import { DollarSignIcon, InfoIcon, Link, MapPinIcon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import AssetDetailInfoCard from './asset-detail-info-card';
import { numberToCurrency } from '@/utils/priceConvert';


const AssetInfoDialog = ({ data }: { data: ITenantRequest }) => {

    const [isVerified, setIsVerified] = useState(false);
    const [textExpanded, setTextExpanded] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) {
            setIsVerified(false);
        }
    }, [open])


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
                        <ScrollArea className='h-[50vh]'>
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

                                <div className='flex flex-col w-full'>
                                    <h5 className='text-lg leading-0'>Các thông tin khác</h5>
                                    <p className='text-sm text-muted-foreground'>Hãy xác nhận trước khi xem thông tin.</p>
                                    <ReCAPTCHA className='mx-auto mt-4'
                                        sitekey={RECAPTCHA_SITE_KEY ?? ""}
                                        onChange={(token) => setIsVerified(!!token)} />

                                    {
                                        isVerified && <>
                                            <div className='grid grid-cols-2 gap-4 items-center mt-4'>
                                                <AssetDetailInfoCard title='Giá thuê' icon={<DollarSignIcon className="w-5 h-5 text-primary" />} content={numberToCurrency(data.price)} />
                                                <AssetDetailInfoCard title='Địa chỉ' icon={<MapPinIcon className="w-5 h-5 text-primary" />} content={data.fullLocation} />
                                                {/* <AssetDetailInfoCard title='Ngày thuê trọ' icon={<Calendar className="w-5 h-5 text-primary" />} content={format(data.startDate,"")} /> */}

                                                <div className='col-span-2'>
                                                    <AssetDetailInfoCard title='Mã giao dịch' icon={<Link className="w-5 h-5 text-primary" />} link={data.transactionHash} />
                                                </div>
                                            </div>
                                        </>
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