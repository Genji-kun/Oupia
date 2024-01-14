"use client"

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User } from '@/interfaces/User';
import React, { useState } from 'react';
import SuggestUserItem from './suggest-user-item';

const SuggestUserList = () => {
    const [users, setUsers] = useState<User[]>([
        {
            name: "Võ Phú Phát",
            username: "phatvo",
            avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
            phoneNumber: "09012345152"
        }, {
            name: "Nguyễn Kim Bảo Ngân",
            username: "ngannguyen",
            avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
            phoneNumber: "09012345152"
        }, {
            name: "Phan Thanh Hải",
            username: "haiphan",
            avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
            phoneNumber: "09012345152"
        }

    ]);
    return (
        <Card>
            <CardHeader>
                <h2 className="font-semibold text-xl">Danh sách người dùng liên quan</h2>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Separator className="mb-2" />
                <div className="flex flex-col gap-2">
                    {users.map((user, index) => {
                        return <>
                            <SuggestUserItem key={index} user={user} />
                        </>
                    })}
                </div>
            </CardContent>
        </Card>

    );
};

export default SuggestUserList;