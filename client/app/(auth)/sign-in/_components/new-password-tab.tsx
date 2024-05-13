import React from 'react';
import { Separator } from '@/components/ui/separator';
import NewPasswordForm from './new-password-form';

const NewPasswordTab = () => {

    return (
        <>
            <div>
                <h1 className="font-montserrat font-bold text-3xl lg:text-4xl mb-2  text-center lg:text-left ">Tạo mật khẩu mới</h1>
                <p className="text-muted-foreground text-center lg:text-left ">Cập nhật mật khẩu mới cho lần đăng nhập tiếp theo.</p>
            </div>
            <Separator className="lg:w-1/2" />
            <NewPasswordForm />
        </>
    );
};

export default NewPasswordTab;