import React from 'react';
import TabContainer from './_components/tab-container';
import AuthContent from '@/components/ui/auth-content';

const SignUpPage = () => {
    return (
        <div
            className="w-full h-full grid grid-cols-1 xl:grid-cols-10 justify-center rounded-xl overflow-hidden shadow-lg border border-border dark:border-border/50">
            <div className="h-full bg-primary-100 hidden xl:block lg:col-span-4">
                <AuthContent />
            </div>
            <div className=" h-full p-4 md:p-10 xl:p-20 xl:py-16 xl:col-span-6 relative">
                <TabContainer />
            </div>
        </div>
    );
};

export default SignUpPage;