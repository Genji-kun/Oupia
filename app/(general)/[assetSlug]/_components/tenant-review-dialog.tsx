"use client"

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useCreateVoteReq } from '@/hooks/mutation';
import { tenantRequestSchema } from '@/lib/schemas/UserSchema';
import { ITenantRequest } from '@/lib/types/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const PhotoInput = dynamic(() => import('./photo-input'), {
    ssr: false
})

const TenantReviewDialog = ({ assetId }: { assetId: number }) => {

    const [open, setOpen] = useState<boolean>(false);
    const [isRequested, setIsRequested] = useState<boolean>(false);
    const { isPendingCreateVoteReq, mutateCreateVoteReq } = useCreateVoteReq();

    const reviewReqForm = useForm<ITenantRequest>({
        resolver: zodResolver(tenantRequestSchema),
        defaultValues: {
            note: "",
            images: []
        }
    });

    async function onSubmit(values: ITenantRequest) {
        const form = new FormData();
        try {
            form.append("request", new Blob([JSON.stringify({
                note: values.note,
                assetId: assetId
            })], { type: "application/json" }));
            if (reviewReqForm.getValues("images").length > 0) {
                reviewReqForm.getValues("images").forEach((file) => {
                    form.append('images', file);
                });
            }
            await mutateCreateVoteReq(form);
            setIsRequested(true);
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau.")
        }
    }

    return (
        <div className='flex justify-center'>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button disabled={isRequested} onClick={() => setOpen(true)} className='styled-button mx-auto py-0'>Gửi yêu cầu đánh giá</Button>
                </DialogTrigger>
                <DialogContent className='lg:w-1/2 2xl:w-1/3'>
                    <DialogHeader>
                        <h3 className='text-xl uppercase font-semibold'>Gửi yêu cầu đánh giá</h3>
                        <p className='text-muted-foreground text-sm'>
                            Vui lòng nhập thông tin để gửi đánh giá đến nhà trọ.
                        </p>
                    </DialogHeader>
                    <Separator />
                    <Form {...reviewReqForm}>
                        <form onSubmit={reviewReqForm.handleSubmit(onSubmit)} className='space-y-4'>
                            <FormField name="note" control={reviewReqForm.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Nội dung <span className='text-destructive'>*</span></FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={5}
                                            placeholder="Nhập nội dung..."
                                            className="resize-none bg-border/50 dark:bg-oupia-base"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Mô tả lý do bạn cần đánh giá nhà trọ này.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <PhotoInput form={reviewReqForm} />
                            <Button disabled={isPendingCreateVoteReq} type="submit" className='w-full styled-button'>
                                <span>Gửi yêu cầu</span>
                                {
                                    isPendingCreateVoteReq && <Loader2 className='w-4 h-4 ml-2 animate-spin' />
                                }
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TenantReviewDialog