"use client";

import React from 'react';
import Tabs from './tabs';
import { SignUpProvider } from '@/contexts/sign-up-context';
import { useSelector } from 'react-redux';

const TabContainer = () => {


    return (
        <SignUpProvider>
            <Tabs />
        </SignUpProvider>
    );
};

export default TabContainer;