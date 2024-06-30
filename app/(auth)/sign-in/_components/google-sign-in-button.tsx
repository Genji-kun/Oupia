"use client";

import { Button } from '@/components/ui/button';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import { useLoginSocial } from '@/hooks/mutation';
import { AuthProvider } from '@/lib/enums';
import { Loader2 } from 'lucide-react';


const GoogleSignInButton = () => {

    const login = useGoogleLogin({
        onSuccess: async (res) => {
            await (mutateLoginSocial({
                accessToken: res["access_token"],
                provider: AuthProvider.GOOGLE
            }))
        },
        onError: () => toast.error("Đăng nhập thất bại, vui lòng đăng nhập lại.")
    });

    const { isPendingLoginSocial, mutateLoginSocial } = useLoginSocial();

    return (
        <Button disabled={isPendingLoginSocial} onClick={() => login()} variant="ghost" className="w-full mx-auto shadow border-border border flex gap-2 py-6 dark:bg-background dark:hover:bg-border">
            {isPendingLoginSocial ? <Loader2 className='w-5 h-5 animate-spin' /> : <FcGoogle className='w-6 h-6' />}
            <span className="text-base">Đăng nhập với Google</span>
        </Button>
    );
};

export default GoogleSignInButton;