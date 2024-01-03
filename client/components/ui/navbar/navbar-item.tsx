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
            <Link href={route.href} className={cn(" hover:text-primary-600", isActive && "text-primary-600")}>
                <span className="md:text-lg font-semibold">{route.name}</span>
            </Link>
        </div>
    );
};

export default NavbarItem;