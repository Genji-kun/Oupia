import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useCreateVote } from '@/hooks/mutation';
import { Vote, VoteType } from '@/lib/types/enums';
import { IVoteRequest } from '@/lib/types/interfaces/Vote';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const VoteDialog = ({ landlordInfoId, isOpen, setIsOpen, voteType }: { landlordInfoId: number, isOpen: boolean, setIsOpen: any, voteType: Vote }) => {

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

    const { isPendingCreateVote, mutateCreateVote } = useCreateVote();

    const onSubmit = async (values: { reason: string }) => {
        const req: IVoteRequest = {
            type: VoteType.LANDLORD,
            vote: voteType,
            reason: values.reason,
            targetId: landlordInfoId,
        }
        try {
            await mutateCreateVote(req);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="w-full md:w-1/2 xl:w-1/3">
                    <DialogHeader>
                        <DialogTitle>Đánh giá thông tin</DialogTitle>
                        <DialogDescription>
                            Xác nhận và đánh giá thông tin nhà trọ.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <Form {...voteForm}>
                        <form onSubmit={voteForm.handleSubmit(onSubmit)} className="grid gap-4 pb-2">
                            <FormField
                                control={voteForm.control}
                                name="reason"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lý do đánh giá</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Hãy nêu lý do bạn chọn đánh giá này..."
                                                className="resize-none bg-accent dark:bg-oupia-base"
                                                rows={5}
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
                        <div className='w-full justify-end flex gap-2'>
                            <Button disabled={isPendingCreateVote} variant="outline" onClick={() => { voteForm.clearErrors(); setIsOpen(false); }}>Hủy</Button>
                            <Button disabled={isPendingCreateVote} type="submit" onClick={voteForm.handleSubmit(onSubmit)} className='styled-button'>
                                <span>Hoàn tất</span>
                                {isPendingCreateVote && <Loader2 className="ml-3 h-4 w-4 animate-spin" />}
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default VoteDialog;
