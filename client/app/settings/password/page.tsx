"use client";

import React from 'react';
import { motion } from "framer-motion";
import PasswordForm from './password-form';

const PasswordSettingsPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-y-5 w-full">
            <div className="border-b-2 w-full pb-5">
                <h2 className="text-xl font-bold mb-2">Mật khẩu</h2>
                <p className="text-gray-700 dark:text-gray-400">Thay đổi mật khẩu mới cho tài khoản của bạn.</p>
            </div>
            <div>
                <PasswordForm />
            </div>
        </motion.div>
    );
};

export default PasswordSettingsPage;