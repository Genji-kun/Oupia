import { User } from '@/interfaces/User';
import Image from 'next/image';
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../dropdown-menu';
import { ChevronDown, ChevronRight, Key, LogOut, Moon, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../button';
import { Switch } from '../switch';
import { useTheme } from 'next-themes';



const NavbarUser = ({ user }: { user: User }) => {
    const { theme, setTheme } = useTheme();

    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }
    return (
        <div className="">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="relative">
                        <Image
                            className="rounded-full"
                            width={45}
                            height={45}
                            src={user.avatar}
                            alt="User avatar" />
                        <Button className="w-fit p-0 h-fit absolute bottom-0 right-0 rounded-full flex items-center justify-center"><ChevronDown size={15} /></Button>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="mt-1 p-2 w-80">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href={`/${user.username}`} className="w-full flex gap-x-4 items-center ">
                                <Image
                                    className="rounded-full"
                                    width={45}
                                    height={45}
                                    src={user.avatar}
                                    alt="User avatar" />
                                <h2 className="font-bold text-base">{user.name}</h2>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Cài đặt</span>
                            <ChevronRight className="ml-auto h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Key className="mr-2 h-4 w-4" />
                            <span>Đổi mật khẩu</span>
                            <ChevronRight className="ml-auto h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div className="flex items-center w-full" onClick={(e) => {
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