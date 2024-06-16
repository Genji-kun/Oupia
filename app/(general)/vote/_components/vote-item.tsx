import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CheckIcon, HelpCircleIcon, X } from 'lucide-react'
import React from 'react'



const VoteItem = () => {
    return (
        <div className='py-4 px-6 border rounded-lg flex flex-col gap-2 bg-background shadow-md dark:bg-oupia-base'>
            VoteItem

            <div className='flex justify-end gap-2'>
                <Button variant={"outline"} className="w-fit h-fit hover:shadow-md">
                    Đồng ý
                    <CheckIcon className="text-green-500 w-4 h-4 ml-2" />
                </Button>
                <Button variant={"outline"} className="w-fit h-fit hover:shadow-md">
                    Không đồng ý
                    <X className="text-destructive w-4 h-4 ml-2" />
                </Button>
                <Button variant={"outline"} className="w-fit h-fit hover:shadow-md">
                    Không biết
                    <HelpCircleIcon className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div >
    )
}

export default VoteItem