import { Button } from '@/components/ui/button';
import { useAuthTabContext } from '@/contexts/auth-tab-context';
import { signIn } from 'next-auth/react';
import React from 'react';
import { SiFacebook } from "react-icons/si";


const FacebookSignInButton = () => {
    const { setProvider } = useAuthTabContext();

    return (
        <Button variant="ghost" onClick={() => { setProvider("FACEBOOK"); signIn('facebook'); }} className="w-full mx-auto shadow border-border border flex gap-2 py-6 dark:bg-background dark:hover:bg-border">
            <SiFacebook size="24" className="fill-[#4267B2]" />
            <span className="text-base">Đăng nhập với Facebook</span>
        </Button>
    );
};

export default FacebookSignInButton;