"use client"

import Image from 'next/image';
import React, { useState } from 'react';
import background from "@/public/background.jpg";
import { motion } from "framer-motion";
import NavbarLogo from '../shared/Header/navbar-logo';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const AuthContent = () => {
    const [isHovered, setIsHovered] = useState(false);

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const router = useRouter();

    if (currentUser) {
        return <>
            {router.push("/")}
        </>
    }

    return (
        <>
            <motion.div onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} className="h-full w-full overflow-hidden relative">
                <motion.div animate={{ scale: isHovered ? 1.03 : 1 }} transition={{ ease: "linear" }} className="w-full h-full">
                    <Image width={500} height={500} className="object-cover w-full h-full" src={background} alt="Auth Content" />
                </motion.div>
                <div className="w-full h-full absolute inset-0 flex flex-col gap-3 items-start justify-between bg-gradient-to-t from-zinc-900/75 to-zinc-800/0 p-8">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.2, ease: "linear" } }} >
                        <NavbarLogo />
                    </motion.div>
                    <div>
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: "linear" } }} className="text-white font-bold font-montserrat text-3xl max-w-[75%]">Kết nối - Tìm kiếm thông minh và an toàn</motion.h1>
                        <motion.h1 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.4, duration: 0.4, ease: "linear" } }} className="text-slate-300 text-lg max-w-[90%] ">Nền tảng tìm kiếm an toàn thông qua xác thực bởi cộng đồng tham gia. Hãy tìm một nơi ở phù hợp với Oupia.</motion.h1>
                    </div>
                </div>
            </motion.div >
        </>
    );
};

export default AuthContent;