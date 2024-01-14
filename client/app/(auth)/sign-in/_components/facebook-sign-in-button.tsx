import { Button } from '@/components/ui/button';
import React from 'react';
import { SiFacebook } from "react-icons/si";


const FacebookSignInButton = () => {
    return (
        <Button variant="ghost" className="w-full mx-auto shadow border-border border flex gap-2 py-6">
            <SiFacebook size="24" className="fill-[#4267B2]" />
            <span className="xl:text-base">Đăng nhập với Facebook</span>
        </Button>
    );
};

export default FacebookSignInButton;