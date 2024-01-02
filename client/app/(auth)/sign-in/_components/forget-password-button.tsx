"use client";

import { useAuthTabContext } from '@/contexts/auth-tab-context';
import React from 'react';

const ForgetPasswordButton = () => {
    const { setTab } = useAuthTabContext();

    return (
        <div className="w-full flex justify-end">
            <button type="button" onClick={() => setTab("forget-password")} className="text-sm font-light hover:font-medium">Quên mật khẩu?</button>
        </div>
    );
};

export default ForgetPasswordButton;