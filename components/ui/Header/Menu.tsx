import React from 'react';
import { Menu } from 'lucide-react';
import NavbarLogo from './Logo';
import SidebarRoutes from './sidebar-routes';
import { Sheet, SheetContent, SheetTrigger } from '../sheet';
import Link from 'next/link';
import { Button } from '../button';
import { MdOutlinePostAdd } from 'react-icons/md';
import SearchButton from './SearchButton';

const NavbarMenu = () => {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden p-1.5 flex items-center justify-center">
                <Menu size={26} />
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <div className="w-full h-full">
                    <div className="p-6">
                        <NavbarLogo />
                    </div>
                    <div className="flex flex-col gap-y-2 ">
                        <SidebarRoutes />
                        <div className="flex flex-wrap items-center gap-2 py-2 px-6">
                            <SearchButton />
                            <Link href="/upload">
                                <Button className="space-x-2 styled-button py-0 px-4">
                                    <span className="text-sm">Đăng bài</span>
                                    <MdOutlinePostAdd className="w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default NavbarMenu;