"use client";

import React from 'react';
import { motion } from "framer-motion";


const ContactTitle = () => {

    const text = "Hãy liên hệ chúng tôi ngay nếu bạn cần hỗ trợ hoặc có lỗi phát sinh";
    const words = text.split(" ");
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                deplayChildren: 0.04 * i
            }
        })
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            }
        },
        visible: (i = 1) => ({
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.12,
                deplayChildren: 0.01 * i
            }
        })
    }

    return (
        <div>
            <div className="text-2xl md:text-4xl font-[Montserrat] font-bold">
                <motion.div
                    className="flex gap-x-[6px] gap-y-4 w-[50rem] mx-auto flex-wrap justify-center"
                    variants={container}
                    initial="hidden"
                    animate="visible">
                    <>
                        {words.map((word, index) => {
                            return <motion.span
                                key={index}
                                variants={child}>
                                {word}
                            </motion.span>
                        })}
                    </>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactTitle;