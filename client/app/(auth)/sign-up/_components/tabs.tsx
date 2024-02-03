import React from 'react';
import { useAuthTabContext } from '@/contexts/auth-tab-context';
import { AnimatePresence, motion } from 'framer-motion';
import SignUpTab from './sign-up-tab';
import EmailTab from './email-tab';

const Tabs = () => {
    const { tab } = useAuthTabContext();

    return (
        <>
            <div className="w-full h-full flex justify-center items-center relative ">
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
                            case "email-tab":
                                return (
                                    <motion.div
                                        key="email-tab"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="flex flex-col justify-center gap-y-8 absolute w-full">
                                        <EmailTab />
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
