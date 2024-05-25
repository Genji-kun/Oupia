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
            <div className="w-full xl:w-[75%] mx-auto h-full flex justify-center items-center relative ">
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
                                        className="flex flex-col justify-center gap-y-5 absolute w-full">
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
                                        className="flex flex-col justify-center gap-y-5 absolute w-full">
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
                                        className="flex flex-col justify-center gap-y-5 absolute w-full">
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
