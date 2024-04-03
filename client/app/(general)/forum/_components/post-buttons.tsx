import { Button } from '@/components/ui/button';
import { MessageSquareText, ThumbsUp } from 'lucide-react';
import React from 'react';

const PostButtons = () => {
    return (
        <div className="flex gap-1">
            <Button variant={"ghost"} className="flex gap-x-2 px-3 h-fit">
                <ThumbsUp size="20" />
                <span className="text-sm font-semibold">Thích</span>
            </Button>
            <Button variant={"ghost"} className="flex gap-x-2 px-3 h-fit">
                <MessageSquareText size="20" />
                <span className="text-sm font-semibold">Bình luận</span>
            </Button>
        </div>
    );
};

export default PostButtons;