import React from 'react';
import TabContainer from './_components/tab-container';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đăng ký người dùng | Oupia',
    description: '',
}

const SignUpPage = () => {
    return (
        <TabContainer />
    );
};

export default SignUpPage;