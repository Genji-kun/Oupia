"use client";

import { AuthTabProvider } from '@/contexts/auth-tab-context';
import React from 'react';
import Tabs from './tabs';

const TabContainer = () => {
    return (
        <AuthTabProvider>
            <Tabs />
        </AuthTabProvider>
    );
};

export default TabContainer;