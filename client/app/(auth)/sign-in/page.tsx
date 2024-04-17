import React from 'react';
import TabContainer from './_components/tab-container';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đăng nhập | Oupia',
    description: '',
}

const SignInPage = () => {
    return (
        <TabContainer />
    );
};

export default SignInPage;
