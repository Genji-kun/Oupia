"use client";

import Link from 'next/link';
import React from 'react';
import "./style.css";
import { routes } from '@/utils/routes';
import NavbarUser from './navbar-user';
import { User } from '@/interfaces/User';

import avatar from "@/public/avatar.jpg";
import { Button } from '../button';
import NavbarItem from './navbar-item';

const NavbarRoutes = () => {
    const user: User = {
        name: "Võ Phú Phát",
        avatar: avatar,
        username: "phatvo",
    };


    return (
        <div className={`nav-routes ${user ? "gap-x-5" : "gap-x-2"}`}>
            <ul className="routes">
                <>
                    {routes.map((route, index) => {
                        return (<li key={index}>
                            <NavbarItem route={route} />
                        </li>);
                    })}
                </>
            </ul>
            {user ?
                <NavbarUser user={user} /> :
                <Link href="/sign-in">
                    <Button className="md:text-base">Đăng nhập</Button>
                </Link>
            }
        </div>

    );
};

export default NavbarRoutes;