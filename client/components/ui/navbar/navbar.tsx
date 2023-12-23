import React from 'react';
import NavbarLogo from './navbar-logo';
import NavbarMenu from './navbar-menu';
import NavbarRoutes from './navbar-routes';
import "./style.css";
import NavbarUser from './navbar-user';
import { Button } from '../button';
import { User } from '@/interfaces/User';
import avatar from "@/public/avatar.jpg";
import Link from 'next/link';


const Navbar = () => {

    const user: User = {
        name: "Võ Phú Phát",
        avatar: avatar,
        username: "phatvo",
    };

    return (
        <div className="navbar">
            <div className="flex h-full items-center justify-between container">
                <div className="hidden md:block">
                    <NavbarLogo />
                </div>
                <NavbarMenu />
                <NavbarRoutes />
                {user ?
                    <NavbarUser user={user} /> :
                    <Link href="/sign-in">
                        <Button className="bg-gray-800 text-gray-50">Đăng nhập</Button>
                    </Link>
                }
            </div>
        </div>
    );
};

export default Navbar;