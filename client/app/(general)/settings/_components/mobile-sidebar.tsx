"use client";

import React, { useState } from 'react';
import { LayoutGrid } from "lucide-react";
import SettingsRouteItem from './settings-routes-item';
import { mobileSettingsRoutes, settingsRoutes } from '@/utils/routes';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';


const MobileSidebar = () => {

    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button className="fixed text-gray-50 bg-gray-700 hover:bg-gray-800 p-2 rounded bottom-5 right-5">
                    <LayoutGrid />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Các cài đặt</DrawerTitle>
                    <DrawerDescription>
                        Chọn mục cài đặt theo yêu cầu.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="w-full overflow-x-auto p-4  ">
                    <ul className="flex flex-wrap gap-5 justify-center">
                        <>
                            {mobileSettingsRoutes.map((route, index) => {
                                const isActive = (pathname === route.href);

                                const Icon = route.icon;
                                return (<li key={index}>
                                    <Link href={route.href}>
                                        <Button variant={"ghost"} className={cn("h-fit w-fit flex-col items-center gap-2 aspect-square border-0", isActive && "text-primary bg-primary-600/20 hover:bg-primary-600/20 hover:text-primary")}>
                                            <Icon className="w-6 h-6" />
                                            <span>{route.name}</span>
                                        </Button>
                                    </Link>
                                </li>);
                            })}
                        </>
                    </ul>
                </div>
            </DrawerContent>
        </Drawer >
    );
};

export default MobileSidebar;