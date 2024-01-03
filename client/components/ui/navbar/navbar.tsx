import React from 'react';
import NavbarLogo from './navbar-logo';
import NavbarMenu from './navbar-menu';
import NavbarRoutes from './navbar-routes';
import "./style.css";
import NavbarUser from './navbar-user';
import { Button } from '../button';
import { User } from '@/interfaces/User';
import Link from 'next/link';


const Navbar = () => {

    const user: User = {
        name: "Võ Phú Phát",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1696484302/z8ch1cp7vfkdrcxgfbai.jpg",
        username: "phatvo",
    };

    return (
        <div className="navbar">
            <div className="flex h-full items-center justify-between container ">
                <div className="hidden md:block">
                    <NavbarLogo />
                </div>
                <NavbarMenu />
                <NavbarRoutes />
                {user ?
                    <NavbarUser user={user} /> :
                    <Link href="/sign-in">
                        <Button className="styled-button bg-primary-500 hover:bg-gradient-to-r from-primary-500 to-primary-700">Đăng nhập</Button>
                    </Link>
                }
            </div>
        </div>
    );
};

export default Navbar;