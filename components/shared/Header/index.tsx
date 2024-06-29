"use client";

import React from 'react';
import NavbarLogo from './navbar-logo';
import { useSelector } from 'react-redux';
import { cn } from "@/lib/utils";
import NavbarRoutes from './navbar-routes';
import NavbarMenu from './navbar-menu';
import UserPopover from './user-popover';
import UnAuthorizedHeader from './unauthorized-header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MdOutlinePostAdd } from 'react-icons/md';
import { Bell, MessagesSquare } from 'lucide-react';
import dynamic from 'next/dynamic';

const SearchButton = dynamic(() => import("./search-button"), {
    ssr: false
})


const Header = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);

    return (
        <header className={cn("bg-background dark:bg-oupia-base p-4 border-b h-[60px] lg:h-[80px] w-full fixed inset-x-0 top-0 shadow z-50")} >
            <nav className="flex h-full items-center justify-between container">
                <div className="hidden lg:flex gap-20 items-center">
                    <NavbarLogo />
                    <NavbarRoutes />
                </div>
                <NavbarMenu />
                <div className="flex items-center gap-x-1">
                    {
                        currentUser ? <>
                            <SearchButton />
                            <div className="hidden lg:flex items-center gap-x-1">
                                <Link href="/upload" className="ml-1">
                                    <Button className="space-x-2 styled-button py-0 px-4">
                                        <span className="text-sm">Đăng bài</span>
                                        <MdOutlinePostAdd className="w-5 h-5" />
                                    </Button>
                                </Link>
                            </div>
                            <Link href="/messages" className="ml-1">
                                <Button variant="ghost" className="p-2.5 hover:bg-border/70 hover:shadow dark:hover:bg-accent dark:hover:shadow-black">
                                    <MessagesSquare size={20} />
                                </Button>
                            </Link>
                            <Button variant="ghost" className="p-2.5 hover:bg-border/70 hover:shadow dark:hover:bg-accent dark:hover:shadow-black">
                                <Bell size={20}></Bell>
                            </Button>
                            <UserPopover user={currentUser} />
                        </> : <UnAuthorizedHeader />
                    }
                </div>
            </nav>
        </header>
    );
};

export default Header;
