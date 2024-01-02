"use client"

import Image from 'next/image';
import React from 'react';
import background from '@/public/loginBG.png';
import { motion } from "framer-motion";

const LoginCarousel = () => {
    const images = [background, undefined, background, undefined, background, undefined, background, undefined];
    const imagesEven = [background, background, background, background, background, background, background, background];


    return (
        <div className="flex flex-col h-full justify-center gap-2 overflow-hidden">
            <div className="flex gap-20 w-full justify-center h-fit rotate-45">
                {
                    imagesEven.map((image, index) => {
                        return (
                            <div key={index} className="w-40 h-40 shadow-sm bg-white flex-shrink-0 rounded-lg -rotate-45">
                                {image && <Image src={image} alt="image" className="object-cover w-full h-full rounded-lg " />}
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex gap-20 w-full justify-center h-fit rotate-45">
                {
                    images.map((_, index) => {
                        return (
                            <div key={index} className={`${index % 2 !== 0 ? "bg-gray-300" : "bg-background"} w-40 h-40 shadow-sm flex-shrink-0 rotate-45 rounded-lg`} />
                        )
                    })
                }
            </div>
            <div className="flex gap-20 w-full justify-center h-fit rotate-45 ">
                {
                    imagesEven.map((image, index) => {
                        return (
                            <div key={index} className="w-40 h-40 shadow-sm bg-white flex-shrink-0 rounded-lg -rotate-45">
                                {image && <Image src={image} alt="image" className="object-cover w-full h-full rounded-lg " />}
                            </div>
                        )
                    })
                }
            </div>

            <div className="flex gap-20 w-full justify-center h-fit rotate-45">
                {
                    images.map((_, index) => {
                        return (
                            <div key={index} className={`${index % 2 !== 0 ? "bg-gray-300" : "bg-background"}  w-40 h-40 shadow-sm flex-shrink-0 rotate-45 rounded-lg`} />
                        )
                    })
                }
            </div>


        </div>
    );
};

export default LoginCarousel;
