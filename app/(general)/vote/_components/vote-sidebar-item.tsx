"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import "../../settings/_components/style.css";
import { cn } from '@/lib/utils';

const VoteSidebarItem = ({ route }: {
    route: {
        href: string,
        name: string,
    }
}) => {
    const pathname = usePathname();
    const isActive = (pathname === route.href);

    return (
        <Link href={route.href} className={cn(isActive ? "active-route" : "")}>
            <div className="px-3 py-2 w-full rounded hover:underline hover:underline-offset-2">{route.name}</div>
        </Link>
    );
};

export default VoteSidebarItem;