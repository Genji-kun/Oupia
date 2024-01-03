"use client";

import React from 'react';
import { AnimatePresence, motion } from "framer-motion";

const AccountSettingsPage = () => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="border-b-2 w-full pb-5">
                <h2 className="text-xl font-bold mb-2">Tài khoản</h2>
                <p className="text-gray-700 dark:text-gray-400">Chỉnh sửa thông tin đăng nhập trong ứng dụng.</p>
            </motion.div>
        </AnimatePresence>

    );
};

export default AccountSettingsPage;