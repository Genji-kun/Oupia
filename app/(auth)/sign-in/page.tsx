import React, { Suspense } from 'react';
import TabContainer from './_components/tab-container';
import { Metadata } from 'next';
import { AuthTabProvider } from '@/contexts/auth-tab-context';
import Loading from './loading';

export const metadata: Metadata = {
    title: 'Đăng nhập',
}

const SignInPage: React.FC = () => {

    return (
        <Suspense fallback={<Loading />}>
            <AuthTabProvider>
                <TabContainer />
            </AuthTabProvider>
        </Suspense>
    );
};

export default SignInPage;
