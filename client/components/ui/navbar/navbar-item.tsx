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
        <div>
            <Link href={route.href} className={cn("md:text-base hover:text-primary text-xl", isActive && "text-primary")}>
                {route.name}
            </Link>
        </div>
    );
};

export default NavbarItem;