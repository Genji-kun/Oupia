"use client";

import React from 'react';
import FullNameForm from './fullname-form';
import { motion } from "framer-motion";

const ProfileSettingsPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-y-5 w-full">
            <div className="border-b-2 w-full pb-5">
                <h2 className="text-xl font-bold mb-2">Thông tin cá nhân</h2>
                <p className="text-gray-700 dark:text-gray-400">Đây là thông tin hiển thị ở trang cá nhân.</p>
            </div>
            <FullNameForm />
        </motion.div>
    );
};

export default ProfileSettingsPage;