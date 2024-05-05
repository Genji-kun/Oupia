"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { reviewEndpoints } from '@/configs/axiosEndpoints'
import { authApi } from '@/configs/axiosInstance'
import { useAssetDetailContext } from '@/contexts/asset-detail-context'
import { ReviewRequest } from '@/interfaces/Review'
import { cn } from '@/lib/utils'
import { convert } from '@/utils/convertAvatarAlt'
import { Loader2, Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

function AssetReviewForm() {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const { asset } = useAssetDetailContext();

    const [currentStar, setCurrentStar] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [reviewReq, setReviewReq] = useState<ReviewRequest>({});

    useEffect(() => {
        handleInputChange("star", currentStar);
    }, [currentStar])

    useEffect(() => {
        handleInputChange("assetId", asset.id);
    }, [])


    const handleInputChange = (field: string, value: any) => {
        setReviewReq(prevState => ({ ...prevState, [field]: value }));
    };

    const handleAddReview = async () => {
        if (reviewReq.star && reviewReq.content) {
            setIsSubmitting(true);
            try {
                const res = await authApi.post(reviewEndpoints["addReview"], reviewReq);
                if (res.status === 200) {
                    toast.success("Thêm đánh giá thành công.");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    return (
        <>

            <DialogHeader>
                <DialogTitle><span className="text-2xl">Tạo đánh giá mới</span></DialogTitle>
                <DialogDescription>
                    Hãy để lại đánh giá giúp cộng đồng có thể nắm bắt được trải nghiệm của bạn khi thuê căn hộ.
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                    <Avatar className='w-20 h-20 mx-auto'>
                        <AvatarImage src={currentUser.avatar} alt={"User Avatar"} />
                        <AvatarFallback>{currentUser.fullName && convert(currentUser.fullName)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-xl text-center">{currentUser.fullName}</h3>
                    <Label htmlFor="stars" className='sr-only'>
                        Số sao đánh giá
                    </Label>
                    <div className="flex gap-2 items-center justify-center my-2">
                        <Star onClick={() => setCurrentStar(1)} size="28" className={cn("cursor-pointer", currentStar >= 1 && "fill-yellow-300 stroke-yellow-300")} />
                        <Star onClick={() => setCurrentStar(2)} size="28" className={cn("cursor-pointer", currentStar >= 2 && "fill-yellow-300 stroke-yellow-300")} />
                        <Star onClick={() => setCurrentStar(3)} size="28" className={cn("cursor-pointer", currentStar >= 3 && "fill-yellow-300 stroke-yellow-300")} />
                        <Star onClick={() => setCurrentStar(4)} size="28" className={cn("cursor-pointer", currentStar >= 4 && "fill-yellow-300 stroke-yellow-300")} />
                        <Star onClick={() => setCurrentStar(5)} size="28" className={cn("cursor-pointer", currentStar >= 5 && "fill-yellow-300 stroke-yellow-300")} />
                    </div>
                    <Label htmlFor="content" className='sr-only'>
                        Nội dung đánh giá
                    </Label>
                    <Textarea
                        value={reviewReq.content}
                        id="content"
                        name="content"
                        rows={4}
                        className="dark:bg-oupia-sub"
                        placeholder='Nhập nội dung đánh giá...'
                        onChange={(evt) => handleInputChange(evt.target.name, evt.target.value)}
                    />
                </div>
            </div>
            <DialogFooter className="justify-end">
                <DialogClose asChild>
                    <Button type="button" variant="outline">
                        Hủy
                    </Button>
                </DialogClose>
                <Button disabled={isSubmitting} className="styled-button gap-2" onClick={handleAddReview}>
                    {
                        isSubmitting ?
                            <>
                                <span className="text-base">Đang xử lý</span>
                                <Loader2 size="22" className="animate-spin" />
                            </>
                            :
                            <>
                                <span className="text-sm">
                                    Đăng đánh giá
                                </span>
                            </>
                    }
                </Button>
            </DialogFooter>
        </>
    )
}

export default AssetReviewForm
