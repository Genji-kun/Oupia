import { Button } from '@/components/ui/button';
import { MessageSquareText } from 'lucide-react';
import React from 'react';
import { RiHeart3Line } from "react-icons/ri";
import { useSelector } from 'react-redux';


const PostButtons = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);


    return (
        <>
            {
                currentUser &&
                <div className="flex gap-1">
                    <Button variant={"ghost"} className="flex gap-x-2 px-3 h-fit" >
                        <RiHeart3Line size="20" />
                        <span className="text-sm font-semibold">Thích</span>
                    </Button>
                    <Button variant={"ghost"} className="flex gap-x-2 px-3 h-fit">
                        <MessageSquareText size="20" />
                        <span className="text-sm font-semibold">Bình luận</span>
                    </Button>
                </div>
            }
        </>


    );
};

export default PostButtons;