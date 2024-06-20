import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const VoteDialog = ({ landlordInfoId, isOpen, setIsOpen }: { landlordInfoId: number, isOpen: boolean, setIsOpen: any }) => {

    const voteSchema = z.object({
        reason: z.string().min(20, {
            message: "Nội dung lý do xác nhận ít nhất 20 ký tự"
        })
    });

    const voteForm = useForm<{ reason: string }>({
        resolver: zodResolver(voteSchema),
        defaultValues: {
            reason: ""
        }
    });

    const onSubmit = async (values: { reason: string }) => {

    }

    return (
        <div className="flex items-center gap-2">
            <Dialog open={isOpen}>
                <DialogContent className="w-1/3">
                    <DialogHeader>
                        <DialogTitle>Đánh giá thông tin</DialogTitle>
                        <DialogDescription>
                            Xác nhận và đánh giá thông tin nhà trọ.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...voteForm}>
                        <form onSubmit={voteForm.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                            <FormField
                                control={voteForm.control}
                                name="reason"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lý do đánh giá</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Hãy nêu lý do tại sao bạn đánh giá "
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    <DialogFooter>
                        <Button variant={"outline"} onClick={() => { voteForm.clearErrors(); setIsOpen(false); }}>Hủy</Button>
                        <Button type="submit" onClick={voteForm.handleSubmit(onSubmit)}>Hoàn tất</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default VoteDialog;