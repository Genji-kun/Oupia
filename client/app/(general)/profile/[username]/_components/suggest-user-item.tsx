import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User } from '@/interfaces/User';
import { ChevronRight, MessagesSquare, MoreHorizontal, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SuggestUserItem = ({ user }: { user: User }) => {
    return (
        <div className="flex gap-5 items-center">
            <Image src={user.avatar} alt="User Avatar" width={300} height={300} className="h-16 w-16 rounded-full border-4 border-background" />
            <div>
                <h2 className="font-montserrat font-semibold">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{user.phoneNumber}</p>
            </div>
            <div className="ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"}>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-1 p-2 w-60" align='end'>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link href={`/messages/${user.username}`} className="w-full flex items-center">
                                    <MessagesSquare className="mr-2 h-4 w-4" />
                                    <span>Nhắn tin</span>
                                    <ChevronRight className="ml-auto h-4 w-4" />
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={`/profile/${user.username}`} className="w-full flex items-center">
                                    <UserRound className="mr-2 h-4 w-4" />
                                    <span>Trang cá nhân</span>
                                    <ChevronRight className="ml-auto h-4 w-4" />
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default SuggestUserItem;