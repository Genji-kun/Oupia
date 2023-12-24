"use client"

import React from 'react';
import { AppearanceForm } from './appearance-form';
import { motion } from "framer-motion";


const AppearanceSettingsPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="space-y-6">
            <div className="border-b-2 w-full pb-5">
                <h2 className="text-xl font-bold mb-2">Màn hình</h2>
                <p className="text-gray-700 dark:text-gray-400">Chỉnh sửa giao diện khi sử dụng ứng dụng.</p>
            </div>
            <AppearanceForm />
        </motion.div>
    )
};

export default AppearanceSettingsPage;