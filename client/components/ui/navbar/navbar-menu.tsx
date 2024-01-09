import React from 'react';
import { Menu } from 'lucide-react';
import NavbarLogo from './navbar-logo';
import SidebarRoutes from './sidebar-routes';
import { Sheet, SheetContent, SheetTrigger } from '../sheet';

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
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default NavbarMenu;