"use client"

import React from 'react';
import NavbarLogo from '@/components/ui/navbar/navbar-logo';
import { motion } from "framer-motion";
import LoginCarousel from '../sign-in/_components/login-carousel';
import TabContainer from '../sign-in/_components/tab-container';

const SignUpPage = () => {

    const scaleVariants = {
        hidden: { scale: 0.8 },
        animate: { scale: 1, transition: { delay: 0.5 } },
        exit: { scale: 0.8 }
    }

    return (
        <motion.div
            variants={scaleVariants}
            initial="hidden"
            animate="animate"
            exit="exit"
            className="w-full h-full grid grid-cols-1 xl:grid-cols-10 justify-center rounded-xl overflow-hidden shadow-lg border border-border">
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

export default SignUpPage;