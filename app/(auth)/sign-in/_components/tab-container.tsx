"use client";

import React from 'react';
import Tabs from './tabs';
import { SignUpProvider } from '@/contexts/sign-up-context';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const TabContainer : React.FC = () => {

    const {currentUser} = useSelector((state: any) => state.currentUserSlice);
    const router = useRouter();

    if(currentUser) {
        return <>{router.push("/")}</>
    }

    return (
        <SignUpProvider>
            <Tabs />
        </SignUpProvider>
    );
};

export default TabContainer;