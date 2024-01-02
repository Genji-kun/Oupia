import React from 'react';
import LoginCarousel from './_components/login-carousel';
import NavbarLogo from '@/components/ui/navbar/navbar-logo';
import TabContainer from './_components/tab-container';

const SignInPage = () => {

    return (
        <div className="h-screen flex items-center container py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-center rounded-xl overflow-hidden shadow-xl border border-gray-200">
                <div className="h-full bg-primary/50 relative hidden lg:block">
                    <LoginCarousel />
                    <div className="absolute left-5 bottom-5">
                        <NavbarLogo />
                    </div>
                </div>
                <div className="h-full p-10 lg:p-20 col-span-2 lg:col-span-1">
                    <TabContainer />
                </div>
            </div>
        </div>
    );
};

export default SignInPage;