"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import "./style.css";

const SettingsRouteItem = ({ route }: {
    route: {
        href: string,
        name: string
    }
}) => {
    const pathname = usePathname();
    const isActive = (pathname === route.href);

    return (
        <Link href={route.href} className={cn(isActive ? "active-route" : "")}>
            <div className="route-name">{route.name}</div>
        </Link>
    );
};

export default SettingsRouteItem;