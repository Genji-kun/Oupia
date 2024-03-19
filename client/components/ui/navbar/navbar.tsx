"use client";

import React from 'react';
import NavbarLogo from './navbar-logo';
import NavbarMenu from './navbar-menu';
import NavbarRoutes from './navbar-routes';
import "./style.css";
import NavbarUser from './navbar-user';
import { Button } from '../button';
import { User } from '@/interfaces/User';
import Link from 'next/link';
import SearchButton from './search-button';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {

    const user: User = {
        fullName: "Võ Phú Phát",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1696484302/z8ch1cp7vfkdrcxgfbai.jpg",
        account: {
            username: "phatvo"
        },
        phoneNumber: "0987654321"
    };

    const { theme, setTheme } = useTheme();

    return (
        <nav className="bg-background dark:bg-componentForeground p-4 border-b dark:border-none h-[80px] w-full fixed inset-x-0 top-0 shadow z-50" >
            <div className="flex h-full items-center justify-between container">
                <div className="hidden lg:flex gap-20 items-center">
                    <NavbarLogo />
                    <NavbarRoutes />
                </div>
                <NavbarMenu />
                {user ?
                    <NavbarUser user={user} /> :
                    <div className="flex gap-x-2">
                        <SearchButton />
                        <Link href="/sign-in">
                            <Button className="styled-button">Đăng nhập</Button>
                        </Link>
                        <>
                            {theme === "light" &&
                                <Button variant={"ghost"} onClick={() => { setTheme("dark") }} className="p-2.5 dark:hover:bg-componentBackground">
                                    <Sun size={20} />
                                </Button>}
                            {theme === "dark" &&
                                <Button variant={"ghost"} onClick={() => { setTheme("light") }} className="p-2.5 dark:hover:bg-componentBackground">
                                    <Moon size={20} />
                                </Button>
                            }
                        </>
                    </div>
                }
            </div>
        </nav >
    );
};

export default Navbar;