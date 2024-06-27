"use client"

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { useAssetDetailContext } from '@/contexts/asset-detail-context'
import { numberToCurrency } from '@/utils/priceConvert';
import { format } from 'date-fns';
import { Calendar, Star, UsersRoundIcon } from 'lucide-react';
import React from 'react'
import { BiArea } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useUserCertification } from '@/hooks/query';
import { Skeleton } from '@/components/ui/skeleton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import dynamic from 'next/dynamic';

const AssetReviewForm = dynamic(() => import('./asset-review-form'), {
    ssr: false
});

const TenantReviewDialog = dynamic(() => import('./tenant-review-dialog'), {
    ssr: false
});

function AssetInfoSection() {

    const { asset, assetScore } = useAssetDetailContext();
    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const { certificationData, isFetchingCertification } = useUserCertification(asset.id);

    return (
        <div>
            <h2 className="text-sm lg:text-normal uppercase font-normal text-muted-foreground mb-3">{asset.fullLocation}</h2>
            <h1 className="font-montserrat font-bold text-xl lg:text-2xl">{asset.assetName}</h1>
            <div className="flex gap-2 items-center">
                <div className="flex gap-1 items-center pr-2 border-r-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <h3><span className="text-muted-foreground">Ngày đăng: </span>{format(asset.createdAt, "dd-MM-yyyy")} </h3>
                </div>
                <div className="flex gap-1 items-center">
                    <BiArea className="w-4.5 h-4.5 text-muted-foreground" />
                    <h3>{asset.area}m²</h3>
                </div>
                <div className="flex gap-1 items-center">
                    <UsersRoundIcon className="w-4 h-4 text-muted-foreground" />
                    <h3> &#8804; {asset.maxPeople} người</h3>
                </div>
                <div className="flex gap-1 items-center">
                    <Star className="w-4 h-4 text-muted-foreground" />
                    <h3>{assetScore ? parseFloat((Number(assetScore)).toFixed(2)) : "Chưa có"}</h3>
                </div>
            </div>
            <div className="flex justify-between items-center mt-3">
                <h3 className="lg:text-xl text-primary-500 font-semibold">{asset.price && numberToCurrency(asset.price)}</h3>
                {
                    isFetchingCertification ? <Skeleton className='h-10 w-36 bg-border dark:bg-oupia-sub' /> : <>
                        {
                            currentUser?.id !== asset.userId && <>
                                {
                                    certificationData.length > 0 ? <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="styled-button">Tạo đánh giá</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-lg max-h-[calc(100vh-80px)] overflow-y-auto">
                                            <AssetReviewForm />
                                        </DialogContent>
                                    </Dialog> :
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button className="styled-button">Tạo đánh giá</Button>
                                            </PopoverTrigger>
                                            <PopoverContent align='end' className='w-96 bg-background mt-1 space-y-4'>
                                                <p className='text-sm text-muted-foreground text-center'>Bạn chưa được cấp chứng chỉ thuê trọ của căn hộ này. Tuy nhiên, bạn có thể gửi yêu cầu xác thực thông tin đánh giá trên cộng đồng để tiếp tục.</p>
                                                <TenantReviewDialog assetId={asset.id} />
                                            </PopoverContent>
                                        </Popover>
                                }
                            </>


                        }
                    </>
                }
            </div>
        </div>
    )
}

export default AssetInfoSection
