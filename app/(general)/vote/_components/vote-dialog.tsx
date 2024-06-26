import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useCreateVote } from '@/hooks/mutation';
import { RECAPTCHA_SITE_KEY } from '@/lib/constants/SettingSystem';
import { Vote, VoteType } from '@/lib/types/enums';
import { ILandlordInfo } from '@/lib/types/interfaces/User';
import { IVoteRequest } from '@/lib/types/interfaces/Vote';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { IoMdThumbsDown, IoMdThumbsUp } from 'react-icons/io';
import { z } from 'zod';

const VoteDialog = (
    {
        landlordInfoId,
        setHasVoted,
        setVoteItem
    }: {
        landlordInfoId: number,
        setHasVoted: React.Dispatch<React.SetStateAction<boolean>>,
        setVoteItem: React.Dispatch<React.SetStateAction<ILandlordInfo>>
    }
) => {

    const [open, setOpen] = useState<boolean>(false);
    const [voteType, setVoteType] = useState<Vote>(Vote.UNKNOWN);
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const { isPendingCreateVote, mutateCreateVote } = useCreateVote();

    useEffect(() => {
        if (!open)
            setIsVerified(false);
    }, [open])

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

    const handleOpenDialog = (vote: Vote) => {
        setOpen(true);
        setVoteType(vote);
    }

    const onSubmit = async (values: { reason: string }) => {
        const req: IVoteRequest = {
            type: VoteType.LANDLORD,
            vote: voteType,
            reason: values.reason,
            targetId: landlordInfoId,
        }
        try {
            const updateData = await mutateCreateVote(req);
            setVoteItem(updateData);
            setHasVoted(true);
            setOpen(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Button variant={"normal"} onClick={() => handleOpenDialog(Vote.ACCEPT)} className="flex items-center gap-1.5">
                <IoMdThumbsUp className='text-transparent fill-emerald-500 w-4 h-4' /> <span>Đồng ý</span>
            </Button>
            <Button variant={"normal"} onClick={() => handleOpenDialog(Vote.DENIED)} className="flex items-center gap-1.5">
                <IoMdThumbsDown className='text-transparent fill-rose-500 w-4 h-4' /> Từ chối
            </Button>
            {
                open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-50 bg-black/70 dark:bg-accent/70 flex justify-center items-center">
                    <div onClick={(evt) => evt.stopPropagation()} className="w-full md:w-1/2 xl:w-1/3 transition-all bg-background px-8 py-6 rounded-lg flex flex-col gap-4 relative">
                        <Button onClick={() => setOpen(false)} variant={"ghost"} className='p-1 w-fit h-fit absolute top-4 right-4'>
                            <X className="w-4 h-4 top-2 right-2" />
                        </Button>
                        <div>
                            <h3 className='text-xl uppercase font-semibold'>Đánh giá thông tin</h3>
                            <p className='text-muted-foreground text-sm'>
                                Xác nhận và đánh giá thông tin nhà trọ.
                            </p>
                        </div>
                        <Separator />
                        <Form {...voteForm}>
                            <form onSubmit={voteForm.handleSubmit(onSubmit)} className="grid gap-4">
                                <div className="flex items-center gap-2">
                                    <span>Bạn đã {voteType === Vote.ACCEPT ? "đồng ý" : "từ chối"}</span>
                                    {voteType === Vote.ACCEPT ? <IoMdThumbsUp className="w-4 h-4 text-transparent fill-emerald-500" /> : <IoMdThumbsDown className="w-4 h-4 text-transparent fill-rose-500" />}
                                </div>
                                <FormField
                                    control={voteForm.control}
                                    name="reason"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-base'>Lý do đánh giá</FormLabel>
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
                                <ReCAPTCHA className='mx-auto' sitekey={RECAPTCHA_SITE_KEY!} onChange={(token) => setIsVerified(!!token)} />
                            </form>
                        </Form>
                        <div>
                            <div className='w-full justify-end flex gap-2'>
                                <Button disabled={isPendingCreateVote} variant="outline" onClick={() => { voteForm.clearErrors(); setOpen(false); }}>Hủy</Button>
                                <Button disabled={!isVerified || isPendingCreateVote} type="submit" onClick={voteForm.handleSubmit(onSubmit)} className='styled-button'>
                                    <span>Hoàn tất</span>
                                    {isPendingCreateVote && <Loader2 className="ml-3 h-4 w-4 animate-spin" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    );
}

export default VoteDialog;
