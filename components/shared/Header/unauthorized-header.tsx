"use client"

import { DARK_MODE, LIGHT_MODE } from '@/lib/constants/SettingSystem';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react'
import { Button } from '../../ui/button';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const SearchButton = dynamic(() => import("./search-button"), {
    ssr: false
})

const UnAuthorizedHeader: React.FC = () => {

    const { theme, setTheme } = useTheme();

    return (
        <div className="flex gap-x-2">
            {theme === LIGHT_MODE ?
                <Button variant={"ghost"} onClick={() => { setTheme(DARK_MODE) }} className="p-2.5 dark:hover:bg-oupia-base">
                    <Sun size={20} />
                </Button>
                :
                <Button variant={"ghost"} onClick={() => { setTheme(LIGHT_MODE) }} className="p-2.5 dark:hover:bg-oupia-sub">
                    <Moon size={20} />
                </Button>
            }
            <SearchButton />
            <Link href="/sign-in">
                <Button className="styled-button">Đăng nhập</Button>
            </Link>
        </div>
    )
}

export default UnAuthorizedHeader;
