import { useMessageContext } from '@/contexts/message-context';
import { User } from '@/interfaces/User';
import { cn } from '@/lib/utils';
import React from 'react';

const MessageDetail = ({ user }: { user: User }) => {

    const { expanded } = useMessageContext();

    return (
        <div className={cn("w-3/5 h-full flex bg-background dark:bg-oupia-sub transition-all rounded-r-xl", !expanded && "w-0")}>
            <div className="w-full shrink-0 h-full flex flex-col p-5">
                <h3 className="text-center text-2xl font-semibold pt-1 shrink-0">Thông tin cuộc trò chuyện</h3>
            </div>
        </div>
    );
};

export default MessageDetail;