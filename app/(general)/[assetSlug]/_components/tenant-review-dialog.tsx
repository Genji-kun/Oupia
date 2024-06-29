"use client"

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useCreateVoteReq } from '@/hooks/mutation';
import { tenantRequestSchema } from '@/lib/schemas/UserSchema';
import { ITenantRequest } from '@/lib/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { vi } from 'date-fns/locale';

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
            setOpen(false);
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
                            )}
                            />
                            <FormField
                                control={reviewReqForm.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="text-base">Ngày bắt đầu thuê  <span className='text-destructive'>*</span></FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full text-left font-normal dark:bg-oupia-base",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                            disabled={isPendingCreateVoteReq}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "dd-MM-yyyy")
                                                            ) : (
                                                                <span>Chọn ngày bắt đầu</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        locale={vi}
                                                        mode="single"
                                                        captionLayout="dropdown-buttons"
                                                        fromYear={1960}
                                                        toYear={2030}
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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