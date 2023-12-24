"use client";

import { navRoutes } from '@/utils/routes';
import React from 'react';
import Link from 'next/link';

const SidebarRoutes = () => {
    return (
        <div className="w-full">
            <ul className="flex flex-col">
                <>
                    {navRoutes.map((route, index) => {
                        return (
                            <Link key={index} href={route.href}>
                                <li className="px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <span>{route.name}</span>
                                </li>
                            </Link>
                        );
                    })}
                </>
            </ul>
        </div>
    );
};

export default SidebarRoutes;