import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react'

const VoteDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="w-fit h-fit hover:shadow-md">
                    Bắt đầu đánh giá
                </Button>
            </DialogTrigger>
            <DialogContent className="w-3/5">
                <DialogHeader>
                    <DialogTitle>Đánh giá thông tin</DialogTitle>
                    <DialogDescription>
                        Xác nhận và đánh giá thông tin nhà trọ.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                </div>
                <DialogFooter>
                    <Button type="submit">Hoàn tất</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default VoteDialog;