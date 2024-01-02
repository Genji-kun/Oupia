"use client "

import React from 'react';
import SignInTab from './sign-in-tab';
import ForgetPasswordTab from './forget-password-tab';
import { useAuthTabContext } from '@/contexts/auth-tab-context';
import { AnimatePresence, motion } from 'framer-motion';

const Tabs = () => {
    const { tab } = useAuthTabContext();

    return (
        <>
            <div className="relative w-full h-full">
                <AnimatePresence>
                    {tab === "sign-in" ?
                        <motion.div
                            key="sign-in"
                            initial={{
                                opacity: 0,
                                x: -40
                            }}
                            animate={{
                                x: 0,
                                opacity: 1
                            }}
                            exit={{
                                opacity: 0,
                                x: -40
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="flex flex-col justify-center gap-y-5 absolute w-full">
                            <SignInTab />
                        </motion.div>
                        :
                        <motion.div
                            key="forget-password"
                            initial={{
                                opacity: 0,
                                x: 100
                            }}
                            animate={{
                                x: 0,
                                opacity: 1
                            }}
                            exit={{
                                opacity: 0,
                                x: 100
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="flex flex-col justify-center gap-y-8 absolute w-full">
                            <ForgetPasswordTab />
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </>
    );
};

export default Tabs;