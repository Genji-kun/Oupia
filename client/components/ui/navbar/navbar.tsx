"use client";

import dynamic from "next/dynamic";

import React, { useEffect, useState } from 'react';
import NavbarLogo from './navbar-logo';
import NavbarMenu from './navbar-menu';
import NavbarRoutes from './navbar-routes';
import "./style.css";
import NavbarUser from './navbar-user';
import { Button } from '../button';
import Link from 'next/link';
import SearchButton from './search-button';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useSelector } from 'react-redux';
import { authApi } from '@/configs/axiosInstance';
import { authEndpoints } from '@/configs/axiosEndpoints';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const Navbar = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();

    const [hidden, setHidden] = useState<boolean>(false);
    const [authToken, setAuthToken] = useState<any>();

    const { scrollY } = useScroll();

    const scrollOpacity = useTransform(scrollY, [0, 80], [0, 1]);
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (pathname === "/") {
            const prev = scrollY.getPrevious();
            if (latest > prev && latest > 150) {
                setHidden(true);
            } else {
                setHidden(false);
            }
        }
    })


    useEffect(() => {
        if (currentUser) {
            const getFbToken = async () => {
                try {
                    const res = await authApi.get(authEndpoints["getAuthToken"]);
                    setAuthToken(res.data);
                } catch (error) {
                    console.error(error);
                }
            }
            getFbToken();
        }
    }, [currentUser])


    return (
        <motion.nav
            // style={{ : scrollOpacity }}
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn("bg-background dark:bg-oupia-base p-4 border-b h-[60px] lg:h-[80px] w-full fixed inset-x-0 top-0 shadow z-50")} >
            <div className="flex h-full items-center justify-between container">
                <div className="hidden lg:flex gap-20 items-center">
                    <NavbarLogo />
                    <NavbarRoutes />
                </div>
                <NavbarMenu />
                <>
                    {currentUser ?
                        <NavbarUser user={currentUser} /> :
                        <div className="flex gap-x-2">

                            {theme === "light" ?
                                <Button variant={"ghost"} onClick={() => { setTheme("dark") }} className="p-2.5 dark:hover:bg-oupia-base">
                                    <Sun size={20} />
                                </Button>
                                :
                                <Button variant={"ghost"} onClick={() => { setTheme("light") }} className="p-2.5 dark:hover:bg-oupia-sub">
                                    <Moon size={20} />
                                </Button>
                            }
                            <SearchButton />
                            <Link href="/sign-in">
                                <Button className="styled-button">Đăng nhập</Button>
                            </Link>
                        </div>}
                </>
            </div>
        </motion.nav>
    );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false })
