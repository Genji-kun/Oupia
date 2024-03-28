"use client";

import { User } from '@/interfaces/User';
import Image from 'next/image';
import React from 'react';
import { Bell, ChevronDown, ChevronRight, Key, LogOut, MessagesSquare, Moon, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../button';
import { Switch } from '../switch';
import { useTheme } from 'next-themes';
import SearchButton from './search-button';
import { MdOutlinePostAdd } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Separator } from '../separator';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/currentUserSlice';


const NavbarUser = ({ user }: { user: any }) => {
    const { theme, setTheme } = useTheme();

    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    const dispatch = useDispatch();

    return (
        <div className="flex items-center gap-x-1">
            <div className="hidden lg:flex items-center gap-x-1">
                <SearchButton />
                <Link href="/upload" className="ml-1">
                    <Button className="space-x-2 styled-button py-0 px-4">
                        <span className="text-sm">Đăng bài</span>
                        <MdOutlinePostAdd className="w-5 h-5" />
                    </Button>
                </Link>
            </div>
            <Link href="/messages" className="ml-1">
                <Button variant="ghost" className="p-2.5 hover:bg-border/70 hover:shadow dark:hover:bg-accent dark:hover:shadow-black">
                    <MessagesSquare size={20} />
                </Button>
            </Link>
            <Button variant="ghost" className="p-2.5 hover:bg-border/70 hover:shadow dark:hover:bg-accent dark:hover:shadow-black">
                <Bell size={20}></Bell>
            </Button>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="relative ml-1">
                        <Avatar className='w-12 h-12 cursor-pointer'>
                            <AvatarImage src={user.avatar} alt={user.username} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Button className="absolute-button text-white"><ChevronDown className="dark:text-white" size={15} /></Button>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="mt-[0.63rem] p-2 w-80 dark:bg-oupia-base flex flex-col gap-1" align='end'>
                    <div className="mb-1">
                        <Link href={`/profile/${user.username}`} className="w-full flex gap-x-4 items-center p-2 hover:bg-accent rounded">
                            <Avatar className='w-12 h-12'>
                                <AvatarImage src={user.avatar} alt={user.username} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h2 className="font-semibold text-lg">{user.fullName}</h2>
                        </Link>
                    </div>
                    <Separator />
                    <div>
                        <Link href="/settings" className="w-full flex items-center py-1 px-2 hover:bg-accent rounded text-sm">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Cài đặt</span>
                            <ChevronRight className="ml-auto h-4 w-4" />
                        </Link>
                        <Link href="/settings/password" className="w-full flex items-center py-1 px-2 hover:bg-accent rounded text-sm">
                            <Key className="mr-2 h-4 w-4" />
                            <span>Đổi mật khẩu</span>
                            <ChevronRight className="ml-auto h-4 w-4" />
                        </Link>
                        <div className="w-full flex items-center py-1 px-2 hover:bg-accent rounded text-sm cursor-pointer" onClick={(e) => {
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
                    </div>
                    <Separator />
                    <div onClick={() => dispatch(logout())} className="w-full flex items-center py-1 px-2 hover:bg-accent rounded text-sm">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Đăng xuất</span>
                    </div>
                </PopoverContent>
            </Popover>
        </div >


    );
};

export default NavbarUser;