"use client";

import { Bell, ChevronDown, ChevronRight, Key, LogOut, MessagesSquare, Moon, Settings, UserRoundSearchIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { useTheme } from 'next-themes';
import { MdOutlinePostAdd } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Separator } from '../../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/currentUserSlice';
import { convert } from '@/utils/convertAvatarAlt';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import React, { PropsWithChildren } from 'react';
import { ICurrentUser } from '@/lib/types/interfaces';
import SearchButton from './SearchButton';
import { UserRole } from '@/lib/types/enums';

type IProps = PropsWithChildren<{
    user: ICurrentUser
}>;

const UserPopover: React.FC<IProps> = ({ user }) => {
    const { theme, setTheme } = useTheme();
    const dispatch = useDispatch();

    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

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
                            <AvatarFallback>{convert(user.fullName)}</AvatarFallback>
                        </Avatar>
                        <Button className="p-0 w-fit h-fit absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-backgroun text-white"><ChevronDown className="dark:text-white" size={15} /></Button>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="mt-[0.63rem] p-2 w-80 dark:bg-oupia-base flex flex-col gap-1" align='end'>
                    <div className="mb-1">
                        <Link href={`/profile/${user.username}`} className="w-full flex gap-x-4 items-center p-2 hover:bg-accent rounded">
                            <Avatar className='w-12 h-12'>
                                <AvatarImage src={user.avatar} alt={user.fullName} />
                                <AvatarFallback>{convert(user.fullName)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <h2 className="font-semibold text-lg">{user.fullName}</h2>
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                    {(() => {
                                        switch (user.role) {
                                            case UserRole.TENANT:
                                                return <>
                                                    <UserRoundSearchIcon className="w-4 h-4" />
                                                    <span>Người tìm trọ</span>
                                                </>
                                            case UserRole.LANDLORD:
                                                return <>
                                                    <HiOutlineHomeModern className="w-4 h-4" />
                                                    <span>Chủ nhà trọ</span>
                                                </>
                                            default:
                                                return <></>
                                        }
                                    })()}
                                </div>
                            </div>
                        </Link>
                    </div>
                    <Separator />
                    <div>
                        {
                            user.role === UserRole.TENANT && <Link href="/settings/landlord" className="w-full flex items-center py-1 px-2 hover:bg-accent rounded text-sm">
                                <HiOutlineHomeModern className="mr-2 h-4 w-4" />
                                <span>Tài khoản chủ nhà trọ</span>
                                <ChevronRight className="ml-auto h-4 w-4" />
                            </Link>
                        }
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
                                    checked={theme === "dark"}
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

export default UserPopover;