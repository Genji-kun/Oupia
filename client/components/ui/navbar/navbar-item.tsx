"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NavbarItem = ({ route }: {
    route: {
        href: string,
        name: string
    }
}) => {
    const pathname = usePathname();
    const isActive = (pathname === "/" && route.href === "/") || pathname === route.href || (pathname !== "/" && pathname?.startsWith(`${route.href}/`));

    return (
        <Link href={route.href} className={cn(" relative after:content-[''] after:absolute after:h-[3px] after:bg-primary-500 after:-bottom-[1.85rem] dark:after:-bottom-[1.8rem] after:left-0 after:w-0 hover:after:w-full after:transition-all", isActive && "after:w-full")}>
            <span className={cn("md:text-lg text-muted-foreground p-4 font-semibold", isActive && "text-foreground")}>{route.name}</span>
        </Link>
    );
};

export default NavbarItem;