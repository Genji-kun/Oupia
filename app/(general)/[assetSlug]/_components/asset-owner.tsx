import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { User } from '@/interfaces/User';
import { MessagesSquare, UserRoundCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AssetOwner = ({ user }: { user: User }) => {
    return (
        <Card className="shadow">
            <CardHeader className="pb-4">
                <div className="flex items-center w-full justify-between">
                    <Link href={`/profile/${user.account?.username}`}>
                        <Image src={user.avatar} width={160} height={160} alt="User Avatar" className="rounded-full w-16 h-16 object-cover" />
                    </Link>
                    <div className="flex gap-2">
                        <Button variant={"ghost"} className="text-base bg-border/80 hover:bg-border flex gap-x-2">
                            <UserRoundCheck size={16} />
                            <span>Theo dõi</span>
                        </Button>
                        <Link href={`/messages/${user.account?.username}`}>
                            <Button className="styled-button flex gap-x-2">
                                <MessagesSquare size={16} />
                                <span>Nhắn tin</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col">
                        <Link href={`/profile/${user.account?.username}`}>
                            <h1 className="font-semibold font-montserrat text-xl">{user.fullName}</h1>
                        </Link>
                        <h1 className="dark:text-gray-400">Số điện thoại: {user.phoneNumber}</h1>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AssetOwner;