"use client";

import { AuthTabProvider } from '@/contexts/auth-tab-context';
import React from 'react';
import Tabs from './tabs';
import { UserProvider } from '@/contexts/user-context';

const TabContainer = () => {
    return (
        <AuthTabProvider>
            <UserProvider>
                <Tabs />
            </UserProvider>
        </AuthTabProvider>
    );
};

export default TabContainer;