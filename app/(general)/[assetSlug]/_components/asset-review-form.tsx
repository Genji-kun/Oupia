"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { reviewEndpoints } from '@/configs/axiosEndpoints'
import { authApi } from '@/configs/axiosInstance'
import { useAssetDetailContext } from '@/contexts/asset-detail-context'
import { ReviewRequest } from '@/interfaces/Review'
import { cn } from '@/lib/utils'
import { convert } from '@/utils/convertAvatarAlt'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Star } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { z } from "zod";


const reviewSchema = z.object({
    content: z.string({
        required_error: "Nội dung đánh giá không được để trống."
    }).min(20, {
        message: "Nội dung đánh giá phải hơn 20 ký tự",
    }),
    star: z.number().min(1, {
        message: "Số sao không hợp lệ",
    }).max(5, {
        message: "Số sao không hợp lệ",
    }),
    assetId: z.number()
})

function AssetReviewForm() {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const { asset, refetch } = useAssetDetailContext();

    const reviewForm = useForm<ReviewRequest>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            assetId: asset.id,
            content: "",
            star: 0
        }
    })

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleAddReview = async (reviewForm: ReviewRequest) => {
        setIsSubmitting(true);
        try {
            const res = await authApi.post(reviewEndpoints["addReview"], reviewForm);
            if (res.status === 200) {
                toast.success("Thêm đánh giá thành công.");
                refetch();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleSubmit = () => {
        reviewForm.handleSubmit(handleAddReview)();
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
            <Form {...reviewForm}>
                <form className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Avatar className='w-20 h-20 mx-auto'>
                            <AvatarImage src={currentUser.avatar} alt={"User Avatar"} />
                            <AvatarFallback>{currentUser.fullName && convert(currentUser.fullName)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-xl text-center">{currentUser.fullName}</h3>
                        <Label htmlFor="stars" className='sr-only'>
                            Số sao đánh giá
                        </Label>
                        <FormField
                            control={reviewForm.control}
                            name="star"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='sr-only'>Số sao đánh giá</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-2 items-center justify-center my-2">
                                            <Star onClick={() => field.onChange(1)} size="28" className={cn("cursor-pointer", field.value! >= 1 && "fill-yellow-300 stroke-yellow-300")} />
                                            <Star onClick={() => field.onChange(2)} size="28" className={cn("cursor-pointer", field.value! >= 2 && "fill-yellow-300 stroke-yellow-300")} />
                                            <Star onClick={() => field.onChange(3)} size="28" className={cn("cursor-pointer", field.value! >= 3 && "fill-yellow-300 stroke-yellow-300")} />
                                            <Star onClick={() => field.onChange(4)} size="28" className={cn("cursor-pointer", field.value! >= 4 && "fill-yellow-300 stroke-yellow-300")} />
                                            <Star onClick={() => field.onChange(5)} size="28" className={cn("cursor-pointer", field.value! >= 5 && "fill-yellow-300 stroke-yellow-300")} />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-center" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={reviewForm.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='sr-only'>Nội dung đánh giá</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={4}
                                            className="dark:bg-oupia-sub"
                                            placeholder='Nhập nội dung đánh giá...'
                                            {...field} />
                                    </FormControl>
                                    <FormMessage className="text-center" />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
            <DialogFooter className="justify-end">
                <DialogClose asChild>
                    <Button type="button" variant="outline">
                        Hủy
                    </Button>
                </DialogClose>
                <Button disabled={isSubmitting} className="styled-button gap-2" onClick={handleSubmit}>
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
