"use client";

import { routes } from '@/utils/routes';
import React from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

const SidebarRoutes = () => {
    return (
        <div className="w-full">
            <ul className="flex flex-col">
                <>
                    {routes.map((route, index) => {
                        return (
                            <Link key={index} href={route.href}>
                                <li className="px-5 py-4 text-base hover:bg-gray-100 dark:hover:bg-gray-900">
                                    <span onClick={() => { toast.success("Okay") }}>{route.name}</span>
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