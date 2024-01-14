"use client";

import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignInButton = () => {

    const [isLogging, setIsLogging] = useState(false);
    const { data: session } = useSession();

    if (session?.user) {
        console.log(session);
    }


    return (
        <Button onClick={() => { signIn('google') }} variant="ghost" className="w-full mx-auto shadow border-border border flex gap-2 py-6">
            <FcGoogle size="24" />
            <span className="xl:text-base">Đăng nhập với Google</span>
        </Button>
    );
};

export default GoogleSignInButton;