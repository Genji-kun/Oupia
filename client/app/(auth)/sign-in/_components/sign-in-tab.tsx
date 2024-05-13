import React from 'react';
import SignInForm from './sign-in-form';
import GoogleSignInButton from './google-sign-in-button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import FacebookSignInButton from './facebook-sign-in-button';

const SignInTab = () => {

    return (
        <>
            <div>
                <h1 className="font-montserrat font-bold text-4xl mb-2 text-center">Đăng nhập</h1>
                <p className="text-muted-foreground text-center">Truy cập để đăng tin tìm mái nhà ưng ý dành cho bạn.</p>
            </div>
            <Separator />
            <SignInForm />
            <Separator />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 w-full justify-center items-center flex-wrap">
                <GoogleSignInButton />
                <FacebookSignInButton />
            </div>
            <div className=" w-full flex gap-x-1 justify-center items-end">
                <h1>Bạn chưa có tài khoản? </h1>
                <Link href="/sign-up" className="text-primary font-bold hover:underline">Đăng ký ngay</Link>
            </div>
        </>
    );
};

export default SignInTab;