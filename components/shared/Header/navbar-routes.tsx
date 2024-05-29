"use client";

import React from 'react';
import { navRoutes } from '@/utils/routes';
import NavbarItem from './navbar-item';

const NavbarRoutes = () => {
    return (
        <div className="flex items-center gap-x-2">
            <ul className="hidden lg:flex gap-x-2 items-center">
                <>
                    {navRoutes.map((route, index) => {
                        return (<li key={index}>
                            <NavbarItem route={route} />
                        </li>);
                    })}
                </>
            </ul>
        </div>

    );
};

export default NavbarRoutes;