import React, { ReactNode } from 'react';
import AuthPageTransition from './auth-page-transition';

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="h-screen flex items-center lg:container xl:py-24 overflow-x-hidden">
            <AuthPageTransition>
                {children}
            </AuthPageTransition>
        </div >
    );
};

export default AuthLayout;