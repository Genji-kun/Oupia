"use client"

import Link from 'next/link';
import React from 'react';
import GoogleSignInButton from '../../sign-in/_components/google-sign-in-button';
import FacebookSignInButton from '../../sign-in/_components/facebook-sign-in-button';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useAuthTabContext } from '@/contexts/auth-tab-context';

const SignUpTab = () => {

    const { setTab } = useAuthTabContext();

    return (
        <>
            <div>
                <h1 className="font-montserrat font-bold text-4xl mb-2 text-center">Welcome to Oupia</h1>
                <p className="text-muted-foreground text-center">Tạo thông tin tài khoản nhanh chóng và hoàn toàn miễn phí</p>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
                <Button onClick={() => setTab("info")} className="styled-button w-full mx-auto shadow border-border border flex gap-2 py-6">
                    <span className="text-base">Đăng ký thông thường</span>
                </Button>
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