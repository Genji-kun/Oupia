"use client";

import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutGrid } from "lucide-react";
import SettingsRoutes from './settings-routes';
import NavbarLogo from '@/components/ui/navbar/navbar-logo';


const MobileSidebar = () => {
    return (
        <Sheet >
            <SheetTrigger asChild>
                <div className="fixed text-gray-50 bg-gray-700 hover:bg-gray-800 p-2 rounded bottom-5 right-5">
                    <LayoutGrid />
                </div>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col gap-y-5">
                <NavbarLogo />
                <SettingsRoutes />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;