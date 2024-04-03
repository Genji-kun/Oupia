import { Separator } from '@/components/ui/separator';
import { Heart, ThumbsUp } from 'lucide-react';
import React from 'react';

const PostStatus = () => {
    return (
        <div className="flex items-center px-4 gap-2">
            <div className="flex gap-x-1 items-center">
                <div className="rounded-full p-1 bg-primary">
                    <ThumbsUp size="10" fill="white" className="text-primary transform scale-x-[-1]" />
                </div>
                <span className="text-sm">12</span>
            </div>
            <Separator orientation='vertical' className="w-[2px] h-1/2" />
            <div className="cursor-pointer hover:underline">
                <h2 className="text-sm">6 bình luận</h2>
            </div>
        </div>
    );
};

export default PostStatus;