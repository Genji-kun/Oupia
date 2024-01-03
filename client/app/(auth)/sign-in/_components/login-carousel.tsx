"use client"

import Image from 'next/image';
import React from 'react';

const LoginCarousel = () => {
    const images = [
        "https://i.pinimg.com/564x/8f/43/e4/8f43e4d4e66cc79295b82926af1fdb30.jpg",
        "https://i.pinimg.com/564x/cb/44/a6/cb44a67648f58c76c3a7669182073050.jpg",
        "https://i.pinimg.com/564x/4b/83/06/4b8306d47f7f23b6238b7d6012db59ec.jpg",
        "https://i.pinimg.com/564x/92/a6/ae/92a6ae7a47007ef3d1233479effff370.jpg",
        "https://i.pinimg.com/564x/fb/b4/d7/fbb4d7ad6f8e6789a11f5a9fb0fb0a48.jpg",
        "https://i.pinimg.com/564x/cb/b7/31/cbb73194833c4aa5e3cb8030df4f6285.jpg",
        "https://i.pinimg.com/564x/16/a4/14/16a41459b6eaccc0bb90cc2357a35a28.jpg",
        "https://i.pinimg.com/564x/d8/1f/43/d81f43f38d767e67ea155c85ffaffc29.jpg"
    ];
    const imagesEven = [
        "https://i.pinimg.com/564x/97/3b/5f/973b5f1d2665f4c3057ee49f23d7f036.jpg",
        "https://i.pinimg.com/564x/7a/44/aa/7a44aaf9d1cefceee9ff76b958ed9610.jpg",
        "https://i.pinimg.com/564x/0e/95/4b/0e954b356f560ad83ac1d7f1b41425ec.jpg",
        "https://i.pinimg.com/236x/f0/98/ea/f098ea3946d430539041584e14a52503.jpg",
        "https://i.pinimg.com/564x/41/42/17/414217d112193c32b37246195f49405b.jpg",
        "https://i.pinimg.com/564x/45/e1/68/45e168a410abc6f21838517af1dba39c.jpg",
        "https://i.pinimg.com/564x/3e/09/be/3e09be17c8eed7f2d16683f344cb8956.jpg",
        "https://i.pinimg.com/564x/8f/1b/1a/8f1b1afb7710da937e3cd464203e3c5f.jpg"
    ];


    return (
        <div className="flex flex-col h-full justify-center gap-2 overflow-hidden">
            <div className="flex gap-20 w-full justify-center h-fit rotate-45">
                {
                    imagesEven.map((image, index) => {
                        return (
                            <div key={index} className="w-40 h-40 shadow-sm bg-white flex-shrink-0 rounded-lg -rotate-45">
                                {image && <Image src={image} width={160} height={160} alt="image" className="object-cover overflow-hidden w-full h-full rounded-lg " />}
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex gap-20 w-full justify-center h-fit rotate-45">
                {
                    images.map((image, index) => {
                        return (
                            <div key={index} className="w-40 h-40 shadow-sm bg-white flex-shrink-0 rounded-lg -rotate-45">
                                {image && <Image src={image} width={160} height={160} alt="image" className="object-cover overflow-hidden w-full h-full rounded-lg " />}
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex gap-20 w-full justify-center h-fit rotate-45 ">
                {
                    imagesEven.reverse().map((image, index) => {
                        return (
                            <div key={index} className="w-40 h-40 shadow-sm bg-white flex-shrink-0 rounded-lg -rotate-45">
                                {image && <Image src={image} alt="image" width={160} height={160} className="object-cover overflow-hidden w-full h-full rounded-lg " />}
                            </div>
                        )
                    })
                }
            </div>

            <div className="flex gap-20 w-full justify-center h-fit rotate-45">
                {
                    images.map((image, index) => {
                        return (
                            <div key={index} className="w-40 h-40 shadow-sm bg-white flex-shrink-0 rounded-lg -rotate-45">
                                {image && <Image src={image} width={160} height={160} alt="image" className="object-cover overflow-hidden w-full h-full rounded-lg " />}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default LoginCarousel;
