import { Separator } from '@radix-ui/react-separator';
import Link from 'next/link';
import React from 'react';
import GoogleSignInButton from '../../sign-in/_components/google-sign-in-button';
import FacebookSignInButton from '../../sign-in/_components/facebook-sign-in-button';

const SignUpTab = () => {
    return (
        <>
            <div>
                <h1 className="font-montserrat font-bold text-4xl mb-2 text-center">Tạo tài khoản</h1>
                <p className="text-gray-600 dark:text-gray-400 text-center">Truy cập để đăng tin tìm mái nhà ưng ý dành cho bạn</p>
            </div>
            <Separator />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 w-full justify-center items-center flex-wrap">
                <GoogleSignInButton />
                <FacebookSignInButton />
            </div>
            <div className=" w-full flex gap-x-1 justify-center items-end">
                <h1>Bạn đã là thành viên? </h1>
                <Link href="/sign-in" className="text-primary font-bold hover:underline">Đăng nhập</Link>
            </div>
        </>
    );
};

export default SignUpTab;