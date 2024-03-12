import React from 'react';
import { User } from '@/interfaces/User';
import Image from 'next/image';
import Link from 'next/link';

const UserItem = ({ user }: { user: User }) => {
    return (
        <Link href={`/messages/${user.account?.username}`} className="hover:bg-primary-200/50 dark:hover:bg-slate-900 p-5">
            <div className="flex items-center space-x-4">
                <Image height={500} width={500}
                    src={user.avatar}
                    alt={"user image"}
                    className="aspect-square w-14 object-cover rounded-full" />
                <div className="space-y-2 truncate">
                    <h2 className="font-semibold">{user.fullName}</h2>
                    <p className="text-muted-foreground text-sm" >Hello bạn, còn nhà trọ nào ở khu vực Bình Chánh không á? Tôi muốn thuê trọ</p>
                </div>
            </div>
        </Link>
    );
};

export default UserItem;