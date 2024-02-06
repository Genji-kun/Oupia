import React from 'react';
import UserForm from './user-form';
import { Separator } from '@/components/ui/separator';

const UserTab = () => {
    return (
        <>
            <div>
                <h1 className="font-montserrat font-bold text-3xl lg:text-4xl mb-2 text-center lg:text-left ">Tài khoản người dùng</h1>
                <p className="text-gray-600 dark:text-gray-700 text-center lg:text-left ">Đăng ký thông tin tài khoản người dùng để truy cập vào hệ thống Oupia.</p>
            </div>
            <Separator className="lg:w-1/2" />
            <UserForm />
        </>
    );
};

export default UserTab;