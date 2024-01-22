"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

const AuthPageTransition = ({ children }: { children: ReactNode }) => {

    const pathname = usePathname();
    const transitionVariants = {
        initial: { x: "100%" },
        animate: { x: 0, transition: { duration: 0.5 } },
        exit: { display: "none" }
    }

    return (
        <AnimatePresence>
            <motion.div
                key={pathname}
                variants={transitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex items-center h-full w-full">
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default AuthPageTransition;