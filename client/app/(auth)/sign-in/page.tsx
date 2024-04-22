import React from 'react';
import TabContainer from './_components/tab-container';
import { Metadata } from 'next';
import { AuthTabProvider } from '@/contexts/auth-tab-context';

export const metadata: Metadata = {
    title: 'Đăng nhập | Oupia',
    description: '',
}


const SignInPage = () => {

    return (
        <AuthTabProvider>
            <TabContainer />
        </AuthTabProvider>
    );
};

export default SignInPage;
