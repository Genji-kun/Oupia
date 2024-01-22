"use client"

import React from 'react';
import LoginCarousel from './_components/login-carousel';
import NavbarLogo from '@/components/ui/navbar/navbar-logo';
import TabContainer from './_components/tab-container';
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const SignInPage = () => {

    const pathname = usePathname();
    const scaleVariants = {
        initial: { scale: 0.8 },
        animate: { scale: 1, transition: { delay: 0.5 } },
        exit: { scale: 0.8 }
    }

    console.log(pathname)

    return (
        <motion.div
            variants={scaleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn("w-full h-full grid grid-cols-1 xl:grid-cols-10 justify-center rounded-xl overflow-hidden shadow-lg border border-border", pathname === "/sign-up" && "hidden")}>
            <div className="h-full bg-primary-100 relative hidden xl:block lg:col-span-6">
                <LoginCarousel />
                <div className="absolute left-5 bottom-5">
                    <NavbarLogo />
                </div>
            </div>
            <div className="h-full w-full p-4 md:p-10 xl:p-20 xl:py-16 xl:col-span-4">
                <TabContainer />
            </div>
        </motion.div>
    );
};

export default SignInPage;