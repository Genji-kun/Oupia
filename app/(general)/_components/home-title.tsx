import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
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

    const textVariants = {
        initial: { y: 200, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 1 } }
    }

    const buttonVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 1 } }
    }

    const arrowVariants = {
        initial: { x: 0, opacity: 0.5 },
        animate: { x: 3, opacity: 0.7, transition: { duration: 0.5, repeat: Infinity } }
    }

    return (
        <>
            <div className="flex flex-col gap-y-4 md:gap-y-6 items-center">
                <div className="flex gap-2 items-center justify-center">
                    <div className="w-20 md:w-24 2xl:w-40 aspect-square">
                        <motion.svg variants={fillVariants} initial="initial" animate="animate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 396.81">
                            <motion.path className="fill-primary stroke-primary" variants={pathVariants} initial="initial" animate="animate" strokeWidth={5} fill="none" d="M4.87,316.94,69,381.06c35.8,35.89,93,6,76-45h0s-21.14-53.93-27-114c-8-82,35.64-120.23,85-112,42,7,58.95,49,57,75-3,40-47,59-46,87,1.07,30,24.79,40,34.89,40h76.43A16.68,16.68,0,0,0,342,295.38V143.93a16.69,16.69,0,0,0-6.07-12.87L181.61,3.81a16.68,16.68,0,0,0-21.22,0L6.07,131.06A16.69,16.69,0,0,0,0,143.93V305.16A16.66,16.66,0,0,0,4.87,316.94Z" />
                        </motion.svg>
                    </div>
                </div>
                <div className="overflow-hidden">
                    <motion.h1 variants={textVariants} initial="initial" animate="animate" className="uppercase text-2xl md:text-3xl 2xl:text-5xl 2xl:leading-tight font-bold text-gray-100 leading-tight text-center w-[75%] mx-auto">
                        Tìm ngay một nơi ở lý tưởng nhất giành cho bạn
                    </motion.h1>
                </div>
                <motion.div variants={buttonVariants} initial="initial" animate="animate" className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-5 w-3/4 lg:w-1/2 mx-auto">
                    <Link href="/find" className="w-full">
                        <Button className="p-2 xl:p-6 styled-button gap-1 w-full">
                            <span className="text-sm xl:text-base font-semibold">Xem tin cho thuê</span>
                            <motion.div variants={arrowVariants} initial="initial" animate="animate">
                                <ChevronRight />
                            </motion.div>
                        </Button>
                    </Link>
                    <Button variant={"ghost"} className="p-2 xl:p-6 border-gray-100 text-gray-100 border hover:text-gray-900 hover:bg-gray-100 gap-2">
                        <span className="text-sm xl:text-base font-semibold">Tìm hiểu thêm</span>
                    </Button>
                </motion.div>
            </div>
        </>
    );
};

export default HomeTitle;
