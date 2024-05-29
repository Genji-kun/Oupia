import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMessageContext } from '@/contexts/message-context';
import { cn } from '@/lib/utils';
import { convert } from '@/utils/convertAvatarAlt';
import React from 'react';

const MessageDetail: React.FC = () => {

    const { expanded, userInfoData } = useMessageContext();

    return (
        <div className={cn("w-3/5 h-full flex bg-background dark:bg-oupia-sub transition-all rounded-r-xl overflow-hidden", !expanded && "w-0")}>
            <div className="w-full shrink-0 h-full flex flex-col gap-5 items-center p-5">
                <div className='flex flex-col items-center'>
                    <Avatar className="w-20 h-20 mt-2">
                        <AvatarImage src={userInfoData.avatar && userInfoData.avatar} alt={userInfoData.fullName} />
                        <AvatarFallback>{convert(userInfoData.fullName)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-center text-xl font-semibold shrink-0 whitespace-nowrap mt-2">{userInfoData.fullName}</h3>
                    <h5 className="text-center text-muted-foreground shrink-0 whitespace-nowrap">{userInfoData.totalFollower} người theo dõi</h5>
                </div>
            </div>
        </div>
    );
};

export default MessageDetail;