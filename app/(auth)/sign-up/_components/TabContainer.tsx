"use client"

import { AuthTabProvider } from '@/contexts/auth-tab-context';
import React from 'react';
import Tabs from './tabs';
import { SignUpProvider } from '@/contexts/sign-up-context';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const TabContainer = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const router = useRouter();

    if (currentUser) {
        return <>{router.push("/")}</>
    }

    return (
        <AuthTabProvider>
            <SignUpProvider>
                <Tabs />
            </SignUpProvider>
        </AuthTabProvider>
    );
};

export default TabContainer;