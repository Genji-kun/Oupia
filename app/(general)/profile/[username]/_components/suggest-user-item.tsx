import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Follower, User } from '@/lib/types/interfaces/User';
import { convert } from '@/utils/convertAvatarAlt';
import { ChevronRight, MessagesSquare, MoreHorizontal, UserRound } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const SuggestUserItem = ({ user }: { user: Follower }) => {
    return (
        <div className="flex gap-5 items-center">
            <Avatar className='h-16 w-16'>
                <AvatarImage src={user.avatar} alt="User Avatar" />
                <AvatarFallback>{user.fullName && convert(user.fullName)}</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="font-montserrat font-semibold">{user.fullName}</h2>
            </div>
            <div className="ml-auto">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={"ghost"}>
                            <MoreHorizontal />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="mt-1 w-60 grid gap-1 p-2" align='end'>
                        <Link href={`/messages/${user.username}`} className="w-full rounded flex items-center py-1 px-4 hover:bg-accent dark:hover:bg-oupia-sub">
                            <MessagesSquare className="mr-2 h-4 w-4" />
                            <span>Nhắn tin</span>
                            <ChevronRight className="ml-auto h-4 w-4" />
                        </Link>
                        <Separator />
                        <Link href={`/profile/${user.username}`} className="w-full rounded flex items-center py-1 px-4 hover:bg-accent dark:hover:bg-oupia-sub">
                            <UserRound className="mr-2 h-4 w-4" />
                            <span>Trang cá nhân</span>
                            <ChevronRight className="ml-auto h-4 w-4" />
                        </Link>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default SuggestUserItem;