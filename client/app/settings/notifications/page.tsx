"use client";

import React from 'react';
import { motion } from "framer-motion";


const NotificationsSettingsPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="space-y-6">
            <div className="border-b-2 w-full pb-5">
                <h2 className="text-xl font-bold mb-2">Thông báo</h2>
                <p className="text-gray-700 dark:text-gray-400">Thiết lập thông tin khi nhận được thông báo.</p>
            </div>
        </motion.div>
    )
};

export default NotificationsSettingsPage;