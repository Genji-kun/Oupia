"use client";

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

const Navbar = () => {

    const { user } = useSelector((state: any) => state.currentUserSlice);

    const { theme, setTheme } = useTheme();
    const [isClient, setIsClient] = useState<boolean>(false);
    useEffect(() => {
        setIsClient(true);
    }, [])

    return (
        <nav className="bg-background dark:bg-oupia-base p-4 border-b h-[60px] lg:h-[80px] w-full fixed inset-x-0 top-0 shadow z-50" >
            <div className="flex h-full items-center justify-between container">
                <div className="hidden lg:flex gap-20 items-center">
                    <NavbarLogo />
                    <NavbarRoutes />
                </div>
                <NavbarMenu />
                <>
                    {user ?
                        <NavbarUser user={user} /> :
                        <div className="flex gap-x-2">
                            {
                                isClient && <>
                                    {theme === "light" ?
                                        <Button variant={"ghost"} onClick={() => { setTheme("dark") }} className="p-2.5 dark:hover:bg-oupia-base">
                                            <Sun size={20} />
                                        </Button>
                                        :
                                        <Button variant={"ghost"} onClick={() => { setTheme("light") }} className="p-2.5 dark:hover:bg-oupia-sub">
                                            <Moon size={20} />
                                        </Button>
                                    }
                                </>
                            }

                            <SearchButton />
                            <Link href="/sign-in">
                                <Button className="styled-button">Đăng nhập</Button>
                            </Link>
                        </div>
                    }
                </>
            </div>
        </nav>
    );
};

export default Navbar;