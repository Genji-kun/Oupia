import React from 'react';
import { Separator } from '@/components/ui/separator';
import ForgetPasswordForm from './forget-password-form';

const ForgetPasswordTab = () => {

    return (
        <>
            <div>
                <h1 className="font-montserrat font-bold text-3xl lg:text-4xl mb-2  text-center lg:text-left ">Quên mật khẩu</h1>
                <p className="text-muted-foreground text-center lg:text-left ">Vui lòng nhập tài khoản email đã đăng ký tại Oupia để lấy mã xác nhận.</p>
            </div>
            <Separator className="lg:w-1/2" />
            <ForgetPasswordForm />
        </>
    );
};

export default ForgetPasswordTab;