"use client"

import React from 'react';
import { Separator } from '@/components/ui/separator';
import AccountForm from './AccountForm';

const UserTab = () => {
    return (
        <>
            <div>
                <h1 className="font-montserrat font-bold text-3xl lg:text-4xl mb-2 text-center lg:text-left ">Tài khoản người dùng</h1>
                <p className="text-muted-foreground text-center lg:text-left ">Đăng ký thông tin tài khoản người dùng để truy cập vào hệ thống Oupia.</p>
            </div>
            <Separator className="lg:w-1/2" />
            <AccountForm />
        </>
    );
};

export default UserTab;