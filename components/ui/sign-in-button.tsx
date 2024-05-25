import React from 'react';
import { signOut, useSession } from "next-auth/react";
import { Button } from './button';

const SignInButton = () => {

    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div className="flex gap-4 ml-auto">
                <p className="text-primary">{session.user.name}</p>
                <Button onClick={() => signOut()}>
                    Đăng xuất
                </Button>
            </div>
        );
    }

    return (
        <div>
            Đăng nhập với Google
        </div>
    );
};

export default SignInButton;