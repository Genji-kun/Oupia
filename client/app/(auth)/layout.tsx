import AuthContent from '@/components/ui/auth-content';
import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';


const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="h-screen flex items-center lg:container xl:py-24 overflow-x-hidden">
            <div className="w-full h-full grid grid-cols-1 xl:grid-cols-10 justify-center rounded-xl overflow-hidden shadow-lg border border-border dark:border-border/50">
                <div className="h-full hidden xl:block lg:col-span-4">
                    <AuthContent />
                </div>
                <div className="bg-background dark:bg-oupia-base h-full p-4 md:p-10 xl:p-20 xl:py-16 xl:col-span-6 relative">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(AuthLayout), { ssr: false })
