"use client"

import React from 'react';
import { useAuthTabContext } from '@/contexts/auth-tab-context';
import { AnimatePresence, motion } from 'framer-motion';
import SignUpTab from './SignUpTab';
import InfoTab from './InfoTab';
import UserTab from './UserTab';

const Tabs = () => {
    const { tab } = useAuthTabContext();

    return (
        <>
            <div className="w-full h-full flex justify-center items-center relative">
                <AnimatePresence>
                    {(() => {
                        switch (tab) {
                            case "sign-up":
                                return (
                                    <motion.div
                                        key="sign-up"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="flex flex-col justify-center gap-y-5 absolute w-full p-4 md:py-10 md:px-24 xl:py-16 xl:px-36">
                                        <SignUpTab />
                                    </motion.div>
                                );
                            case "info":
                                return (
                                    <motion.div
                                        key="info"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="flex flex-col justify-center gap-y-5 absolute w-full p-4 md:py-10 md:px-24 xl:py-16 xl:px-36">
                                        <InfoTab />
                                    </motion.div>
                                );
                            case "user":
                                return (
                                    <motion.div
                                        key="user"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="flex flex-col justify-center gap-y-5 absolute w-full p-4 md:py-10 md:px-24 xl:py-16 xl:px-36">
                                        <UserTab />
                                    </motion.div>
                                );
                            default:
                                return null;
                        }
                    })()}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Tabs;
