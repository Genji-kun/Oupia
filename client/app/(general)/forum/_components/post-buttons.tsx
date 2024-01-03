import { Button } from '@/components/ui/button';
import { MessageSquareText, Share2, ThumbsUp } from 'lucide-react';
import React from 'react';

const PostButtons = () => {
    return (
        <div className="grid grid-cols-3 border-y border-border">
            <Button variant={"ghost"} className="flex gap-x-2">
                <ThumbsUp size="20" />
                <span className="text-xs md:text-sm font-semibold">Thích</span>
            </Button>
            <Button variant={"ghost"} className="flex gap-x-2">
                <MessageSquareText size="20" />
                <span className="text-xs md:text-sm font-semibold">Bình luận</span>
            </Button>
            <Button variant={"ghost"} className="flex gap-x-2">
                <Share2 size="20" />
                <span className="text-xs md:text-sm font-semibold">Chia sẻ</span>
            </Button>
        </div>
    );
};

export default PostButtons;