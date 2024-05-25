import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TabContainer from './_components/TabContainer';
import Loading from './loading';

export const metadata: Metadata = {
    title: 'Đăng ký người dùng',
}

const SignUpPage: React.FC = () => {
    return (
        <Suspense fallback={<Loading />}>
            <TabContainer />
        </Suspense>
    );
};

export default SignUpPage;