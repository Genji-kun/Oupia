import React from 'react';
import LoginCarousel from './_components/login-carousel';
import NavbarLogo from '@/components/ui/navbar/navbar-logo';
import TabContainer from './_components/tab-container';

const SignInPage = () => {

    return (
        <div className="h-screen flex items-center lg:container lg:py-24">
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-10 justify-center rounded-xl overflow-hidden shadow-lg border border-border">
                <div className="h-full bg-primary-100 relative hidden lg:block lg:col-span-6">
                    <LoginCarousel />
                    <div className="absolute left-5 bottom-5">
                        <NavbarLogo />
                    </div>
                </div>
                <div className="h-full w-full p-4 xl:p-20 xl:py-16 lg:col-span-4">
                    <TabContainer />
                </div>
            </div>
        </div>
    );
};

export default SignInPage;