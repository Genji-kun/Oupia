import React from 'react';
import { motion } from "framer-motion";


const ContactTitle = () => {
    return (
        <div className="w-full lg:w-1/2 mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-3xl md:text-4xl font-[Montserrat] font-bold">
                Hãy liên hệ chúng tôi ngay nếu bạn cần hỗ trợ hoặc có lỗi phát sinh
            </motion.div>
        </div>
    );
};

export default ContactTitle;