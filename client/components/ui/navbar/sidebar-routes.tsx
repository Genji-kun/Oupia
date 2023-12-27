"use client";

import { navRoutes } from '@/utils/routes';
import React from 'react';
import SidebarItem from './sidebar-item';

const SidebarRoutes = () => {
    return (
        <div className="w-full">
            <ul className="flex flex-col">
                <>
                    {navRoutes.map((route, index) => {
                        return (<li key={index}>
                            <SidebarItem route={route} />
                        </li>);
                    })}
                </>
            </ul>
        </div>
    );
};

export default SidebarRoutes;