import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserCertification } from '@/hooks/query';
import React from 'react'
import { useSelector } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import dynamic from 'next/dynamic';

const AssetReviewForm = dynamic(() => import('./asset-review-form'), {
    ssr: false
});

const TenantReviewDialog = dynamic(() => import('./tenant-review-dialog'), {
    ssr: false
});


const AssetReviewDialog = ({ assetId, userId }: { assetId: number, userId: number }) => {

    const { certificationData, isFetchingCertification } = useUserCertification(assetId);
    const { currentUser } = useSelector((state: any) => state.currentUserSlice);

    return (
        <>
            {
                isFetchingCertification ? <Skeleton className='h-10 w-36 bg-border dark:bg-oupia-sub' /> : <>
                    {
                        currentUser.id !== userId && <>
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
                                            <TenantReviewDialog assetId={assetId} />
                                        </PopoverContent>
                                    </Popover>
                            }
                        </>

                    }
                </>
            }
        </>
    )
}

export default AssetReviewDialog