"use client"

import { Button } from '@/components/ui/button';
import { useAuthTabContext } from '@/contexts/auth-tab-context';
import React from 'react';

const EmailSignUpButton = () => {
    const { setTab } = useAuthTabContext();
    return (
        <Button onClick={() => setTab("email")} className="styled-button w-full mx-auto shadow border-border border flex gap-2 py-6">
            <span className="text-base">Đăng ký thông thường</span>
        </Button>
    );
};

export default EmailSignUpButton;