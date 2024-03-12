"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from "framer-motion"
import { useTranslation } from 'next-i18next';

const NavbarItem = ({ route }: {
    route: {
        href: string,
        name: string
    }
}) => {
    const pathname = usePathname();
    const isActive = (pathname === "/" && route.href === "/") || pathname === route.href || (pathname !== "/" && pathname?.startsWith(`${route.href}/`));
    const { t }: any = useTranslation('routes');


    return (
        <Link href={route.href} className={cn(" relative after:content-[''] after:absolute after:h-[3px] after:bg-primary-500 after:-bottom-[1.85rem] after:left-0 after:w-0 hover:after:w-full after:transition-all", isActive && "after:w-full")}>
            <span className={cn("md:text-lg text-muted-foreground p-4 font-semibold", isActive && "text-foreground")}>{t(route.name)}</span>
        </Link>
    );
};

export default NavbarItem;