"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from "framer-motion"

const NavbarItem = ({ route }: {
    route: {
        href: string,
        name: string
    }
}) => {
    const pathname = usePathname();
    const isActive = (pathname === "/" && route.href === "/") || pathname === route.href || (pathname !== "/" && pathname?.startsWith(`${route.href}/`));

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            <Link href={route.href} className={cn(" hover:text-primary-500", isActive && "text-primary-500")}>
                <span className="md:text-lg font-semibold">{route.name}</span>
            </Link>
        </motion.div>
    );
};

export default NavbarItem;