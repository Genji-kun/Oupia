"use client"

import { motion } from "framer-motion";
import React from 'react';

const HomeTitle = () => {
    const pathVariants = {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: "easeInOut" } }
    }

    const fillVariants = {
        initial: { fillOpacity: 0 },
        animate: { fillOpacity: 1, transition: { delay: 2, duration: 1 } }
    }
    return (
        <div className="flex flex-col gap-y-10 items-center -translate-y-5">
            <div className="w-36 h-36">
                <motion.svg variants={fillVariants} initial="initial" animate="animate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 396.81">
                    <motion.path className="fill-primary-500 stroke-primary-500" variants={pathVariants} initial="initial" animate="animate" strokeWidth={5} fill="none" d="M4.87,316.94,69,381.06c35.8,35.89,93,6,76-45h0s-21.14-53.93-27-114c-8-82,35.64-120.23,85-112,42,7,58.95,49,57,75-3,40-47,59-46,87,1.07,30,24.79,40,34.89,40h76.43A16.68,16.68,0,0,0,342,295.38V143.93a16.69,16.69,0,0,0-6.07-12.87L181.61,3.81a16.68,16.68,0,0,0-21.22,0L6.07,131.06A16.69,16.69,0,0,0,0,143.93V305.16A16.66,16.66,0,0,0,4.87,316.94Z" />
                </motion.svg>
            </div>
            <h1 className="text-6xl font-bold text-gray-100 leading-tight text-center w-[75%] mx-auto">
                Tìm ngay một nơi ở lý tưởng nhất giành cho bạn
            </h1>
            {/* <p className="text-xl text-center">Nền tảng Oupia hỗ trợ tìm trọ nhanh chóng, tiện lợi và an toàn</p> */}
        </div >
    );
};

export default HomeTitle;
