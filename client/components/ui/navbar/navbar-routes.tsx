"use client";

import React from 'react';
import "./style.css";
import { navRoutes } from '@/utils/routes';
import NavbarItem from './navbar-item';

const NavbarRoutes = () => {
    return (
        <div className="nav-routes">
            <ul className="hidden lg:flex gap-x-6 lg:gap-x-12">
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