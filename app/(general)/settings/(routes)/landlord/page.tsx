"use client";

import React from 'react'
import { motion } from 'framer-motion';
import UpgradeForm from './_components/upgrade-form';

function LandlordUpgradePage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-y-5 w-full">
            <div className="border-b-2 w-full pb-5">
                <h2 className="text-xl font-semibold mb-2">Tài khoản Chủ nhà trọ</h2>
                <p className="text-muted-foreground">Nâng cấp thông tin tài khoản đối với Chủ nhà trọ để mở rộng giới hạn chức năng của hệ thống.</p>
            </div>
            <UpgradeForm />
        </motion.div>)
}

export default LandlordUpgradePage;