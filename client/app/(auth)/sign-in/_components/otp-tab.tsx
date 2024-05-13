"use client"

import { Separator } from '@/components/ui/separator';
import React from 'react'
import { Check } from 'lucide-react';
import { OtpForm } from './otp-form';

const OtpTab = () => {
    return (
        <>
            <div>
                <h1 className="font-montserrat font-bold text-3xl lg:text-4xl mb-2  text-center lg:text-left ">Nhập mã OTP</h1>
                <div className="flex gap-1 items-center">
                    <Check className="w-5 h-5 text-green-600"/>
                    <p className="text-muted-foreground text-center lg:text-left ">Hệ thống đã gửi mã OTP qua email bạn đăng ký, vui lòng kiểm tra.</p>
                </div>
            </div>
            <Separator className="lg:w-1/2" />
            <OtpForm />
        </>
    );
}

export default OtpTab;
