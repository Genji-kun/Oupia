import { Heart } from 'lucide-react';
import React from 'react';

const PostStatus = () => {
    return (
        <div className="flex items-center justify-between px-4">
            <div className="flex gap-x-1 items-center">
                <div className="rounded-full p-1 border bg-red-400">
                    <Heart size="10" fill="white" className="text-white" />
                </div>
                <span className="text-sm font-semibold">12</span>
            </div>
            <div>
                <h2 className="text-sm font-semibold">6 bình luận</h2>
            </div>
        </div>
    );
};

export default PostStatus;