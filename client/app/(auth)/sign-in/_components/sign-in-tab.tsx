import React from 'react';
import SignInForm from './sign-in-form';
import GoogleSignInButton from './google-sign-in-button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const SignInTab = () => {
    return (
        <>
            <div>
                <h1 className="font-montserrat font-bold text-3xl lg:text-4xl mb-2  text-center lg:text-left ">Đăng nhập</h1>
                <p className="text-gray-600 dark:text-gray-700 text-center  lg:text-left ">Truy cập để đăng tin tìm mái nhà ưng ý dành cho bạn</p>
            </div>
            <Separator className="lg:w-1/2" />
            <SignInForm />
            <Separator />
            <GoogleSignInButton />
            <div className=" w-full flex gap-x-1 justify-center items-end">
                <h1>Bạn chưa có tài khoản? </h1>
                <Link href="/sign-up" className="text-primary font-bold hover:underline">Đăng ký ngay</Link>
            </div>
        </>
    );
};

export default SignInTab;