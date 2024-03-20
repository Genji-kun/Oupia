import { useMessageContext } from '@/contexts/message-context';
import { User } from '@/interfaces/User';
import { cn } from '@/lib/utils';
import React from 'react';

const MessageDetail = ({ user }: { user: User }) => {

    const { expanded } = useMessageContext();

    return (
        <div className={cn("w-3/5 h-full border-l shadow dark:border-none dark:bg-componentForeground transition-all rounded-xl", !expanded && "w-0")}>

        </div>
    );
};

export default MessageDetail;