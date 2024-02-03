import React, { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="h-screen flex items-center lg:container xl:py-24 overflow-x-hidden">
            {children}
        </div >
    );
};

export default AuthLayout;