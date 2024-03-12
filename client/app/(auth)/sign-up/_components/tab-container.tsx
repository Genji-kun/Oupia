"use client";

import { AuthTabProvider } from '@/contexts/auth-tab-context';
import React from 'react';
import Tabs from './tabs';
import { SignUpProvider } from '@/contexts/sign-up-context';

const TabContainer = () => {
    return (
        <AuthTabProvider>
            <SignUpProvider>
                <Tabs />
            </SignUpProvider>
        </AuthTabProvider>
    );
};

export default TabContainer;