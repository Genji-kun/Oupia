import { Separator } from '@/components/ui/separator';
import React from 'react';
import SignUpForm from './sign-up-form';

const EmailTab = () => {
    return (
        <>
            <div>
                <h1 className="font-montserrat font-bold text-3xl lg:text-4xl mb-2  text-center lg:text-left ">Đăng ký tài khoản</h1>
                <p className="text-gray-600 dark:text-gray-700 text-center lg:text-left ">Hoàn thành các thông tin bên dưới để truy cập vào Oupia.</p>
            </div>
            <Separator className="lg:w-1/2" />
            <SignUpForm />
        </>
    );
};

export default EmailTab;