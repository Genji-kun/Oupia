import React from 'react';
import { Button } from '../button';
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
            <Link href={route.href} className={cn(isActive && "font-bold text-primary")}>
                <Button variant="ghost" className="md:text-base hover:text-primary">{route.name}</Button>
            </Link>
        </div>
    );
};

export default NavbarItem;