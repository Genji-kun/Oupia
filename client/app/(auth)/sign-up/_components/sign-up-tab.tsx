import Link from 'next/link';
import React from 'react';
import GoogleSignInButton from '../../sign-in/_components/google-sign-in-button';
import FacebookSignInButton from '../../sign-in/_components/facebook-sign-in-button';
import EmailSignUpButton from './email-sign-up-button';
import { Separator } from '@/components/ui/separator';

const SignUpTab = () => {
    return (
        <>
            <div>
                <h1 className="font-montserrat font-bold text-4xl mb-2 text-center">Welcome to Oupia</h1>
                <p className="text-gray-600 dark:text-gray-400 text-center">Tạo thông tin tài khoản nhanh chóng và hoàn toàn miễn phí</p>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
                <EmailSignUpButton />
                <GoogleSignInButton />
                <FacebookSignInButton />
            </div>
            <Separator />
            <div className=" w-full flex gap-x-1 justify-center items-end">
                <h1>Bạn đã là thành viên? </h1>
                <Link href="/sign-in" className="text-primary font-bold hover:underline">Đăng nhập</Link>
            </div>
        </>
    );
};

export default SignUpTab;