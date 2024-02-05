import React from 'react';
import SignInTab from './sign-in-tab';
import ForgetPasswordTab from './forget-password-tab';
import { useAuthTabContext } from '@/contexts/auth-tab-context';
import { AnimatePresence, motion } from 'framer-motion';
import ChangePasswordTab from './change-password-tab';

const Tabs = () => {
    const { tab } = useAuthTabContext();

    console.log(tab)

    return (
        <>
            <div className="w-full h-full flex justify-center items-center relative ">
                <AnimatePresence>
                    {(() => {
                        switch (tab) {
                            case "sign-in":
                                return (
                                    <motion.div
                                        key="sign-in"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="flex flex-col justify-center gap-y-5 absolute w-full">
                                        <SignInTab />
                                    </motion.div>
                                );
                            case "forget-password":
                                return (
                                    <motion.div
                                        key="forget-password"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="flex flex-col justify-center gap-y-8 absolute w-full">
                                        <ForgetPasswordTab />
                                    </motion.div>
                                );
                            case "change-password":
                                return (
                                    <motion.div
                                        key="change-password"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="flex flex-col justify-center gap-y-8 absolute w-full">
                                        <ChangePasswordTab />
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
