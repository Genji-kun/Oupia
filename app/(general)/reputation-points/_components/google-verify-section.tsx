"use client"

import { Button } from '@/components/ui/button';
import { useVerifySocial } from '@/hooks/mutation';
import { AuthProvider } from '@/lib/enums';
import { ICurrentUser } from '@/lib/interfaces/response/User';
import { useGoogleLogin } from '@react-oauth/google';
import { Check, ChevronRight, Loader2 } from 'lucide-react';
import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

const GoogleVerifySection = ({ user }: { user: ICurrentUser }) => {

    const { isPendingVerify, mutateVerify } = useVerifySocial();

    const login = useGoogleLogin({
        onSuccess: async (res) => {
            try {
                await (mutateVerify({
                    accessToken: res["access_token"], provider: AuthProvider.GOOGLE
                }))
            } catch (error: any) {
                if (error.response.data.code === 3304 && error.response.status === 400) {
                    toast.error("Tài khoản này đã được đăng ký trong hệ thống, không thể xác thực.")
                }
                toast.error("Máy chủ chưa khởi động, vui lòng thử lại.")
            }
        },
        onError: () => toast.error("Xác thực thông tin thất bại, vui lòng thử lại.")
    });


    return (
        <div className='flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
                <FcGoogle className='w-10 h-10' />
                <div className='h-fit'>
                    <h3 className='text-muted-foreground'>Xác thực thông tin bằng tài khoản <span className='text-foreground font-semibold'>Google</span></h3>
                    <h5 className='text-sm'>+10 điểm.</h5>
                </div>
            </div>
            {
                user.provider && user.provider.findIndex(item => item === "GOOGLE") > -1 ?
                    <div className='flex gap-1.5 items-center text-emerald-500'>
                        <Check className="w-5 h-5" />
                        <span className='font-semibold'>Đã hoàn thành</span>
                    </div>
                    :
                    <Button onClick={() => login()} disabled={isPendingVerify} className='styled-button pr-2'>
                        <span>Xác thực</span>
                        {
                            isPendingVerify ?
                                <Loader2 className='w-5 h-5 ml-2 animate-spin' />
                                :
                                <ChevronRight className='w-5 h-5 ml-2' />
                        }
                    </Button>
            }
        </div>
    )
}

export default GoogleVerifySection;