"use client";

import React from 'react';
import NavbarLogo from './navbar-logo';
import NavbarRoutes from './navbar-routes';
import { useSelector } from 'react-redux';
import { cn } from "@/lib/utils";

import Hydration from '../Hydration';
import NavbarMenu from './navbar-menu';
import dynamic from 'next/dynamic';

const UserPopover = dynamic(() => import('./user-popover'), {
    ssr: false,
});

const UnAuthorizedHeader = dynamic(() => import('./unauthorized-header'), {
    ssr: false,
});

const Header = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);

    return (
        <Hydration>
            <header className={cn("bg-background dark:bg-oupia-base p-4 border-b h-[60px] lg:h-[80px] w-full fixed inset-x-0 top-0 shadow z-50")} >
                <nav className="flex h-full items-center justify-between container">
                    <div className="hidden lg:flex gap-20 items-center">
                        <NavbarLogo />
                        <NavbarRoutes />
                    </div>
                    <NavbarMenu />
                    {currentUser ? <UserPopover user={currentUser} /> : <UnAuthorizedHeader />}
                </nav>
            </header>
        </Hydration>
    );
};

export default Header;
