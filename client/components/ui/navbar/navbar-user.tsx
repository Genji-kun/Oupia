"use client";

import { User } from '@/interfaces/User';
import Image from 'next/image';
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../dropdown-menu';
import { Bell, ChevronDown, ChevronRight, Key, LogOut, MessagesSquare, Moon, Search, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../button';
import { Switch } from '../switch';
import { useTheme } from 'next-themes';
import SearchButton from './search-button';
import { MdOutlinePostAdd } from "react-icons/md";


const NavbarUser = ({ user }: { user: User }) => {
    const { theme, setTheme } = useTheme();

    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }
    return (
        <div className="flex items-center gap-x-1">

            <SearchButton />
            <Link href="/upload" className="ml-1">
                <Button className="space-x-2 styled-button py-0 px-4">
                    <span className="text-sm">Đăng bài</span>
                    <MdOutlinePostAdd className="w-5 h-5" />
                </Button>
            </Link>
            <Link href="/messages" className="ml-1">
                <Button variant="ghost" className="p-2.5 dark:hover:bg-componentBackground dark:hover:shadow dark:hover:shadow-black hover:text-">
                    <MessagesSquare size={20}></MessagesSquare>
                </Button>
            </Link>
            <Button variant="ghost" className="p-2.5 dark:hover:bg-componentBackground dark:hover:shadow dark:hover:shadow-black">
                <Bell size={20}></Bell>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="relative ml-1">
                        <Image
                            className="rounded-full h-12 w-12"
                            width={160}
                            height={160}
                            src={user.avatar}
                            alt="User avatar" />
                        <Button className="absolute-button"><ChevronDown className="dark:text-white" size={15} /></Button>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="mt-[0.63rem] p-2 w-80 dark:bg-componentBackground">
                    <DropdownMenuGroup className="mb-2">
                        <DropdownMenuItem>
                            <Link href={`/profile/${user.account?.username}`} className="w-full flex gap-x-4 items-center ">
                                <Image
                                    className="rounded-full h-12 w-12"
                                    width={160}
                                    height={160}
                                    src={user.avatar}
                                    alt="User avatar" />
                                <h2 className="font-bold text-base">{user.fullName}</h2>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href="/settings" className="w-full flex items-center">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Cài đặt</span>
                                <ChevronRight className="ml-auto h-4 w-4" />
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/settings/password" className="w-full flex items-center">
                                <Key className="mr-2 h-4 w-4" />
                                <span>Đổi mật khẩu</span>
                                <ChevronRight className="ml-auto h-4 w-4" />
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div className="flex items-center w-full" onClick={(e) => {
                                e.stopPropagation(); changeTheme();
                            }}>
                                <Moon className="mr-2 h-4 w-4" />
                                <span>Chế độ tối</span>
                                <div className="ml-auto">
                                    <Switch
                                        checked={theme !== "system" && theme === "dark"}
                                        onClick={(e) => {
                                            e.stopPropagation(); changeTheme();
                                        }}
                                    />
                                </div>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Đăng xuất</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>


    );
};

export default NavbarUser;