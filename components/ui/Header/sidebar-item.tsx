import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';

const SidebarItem = ({ route }: {
    route: {
        href: string,
        name: string
    }
}) => {
    const pathname = usePathname();
    const isActive = (pathname === "/" && route.href === "/") || pathname === route.href || (pathname !== "/" && pathname?.startsWith(`${route.href}/`));

    return (
        <Link href={route.href}>
            <div className={cn("px-6 py-2 hover:bg-gray-100 dark:hover:bg-accent text-muted-foreground", isActive && " font-semibold text-foreground border-r-4 border-primary")}>{route.name}</div>
        </Link>
    );
};


export default SidebarItem;