"use client";

import { Bell, ChevronDown, ChevronRight, LogOut, MessagesSquare, Moon, PlusIcon, UserRoundSearchIcon } from 'lucide-react';
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
import { UserRole } from '@/lib/enums';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ICurrentUser } from '@/lib/interfaces/response/User';
import { PiHandHeart } from 'react-icons/pi';
import { cn } from '@/lib/utils';

type IProps = PropsWithChildren<{
    user: ICurrentUser
}>;

const UserPopover: React.FC<IProps> = ({ user }) => {

    const { theme, setTheme } = useTheme();
    const router = useRouter();

    const dispatch = useDispatch();

    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    const handleLogOut = () => {
        Cookies.remove("accessToken");
        Cookies.remove("user");
        router.push("/");
        dispatch(logout());

    }

    return (
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
                        user.role === UserRole.TENANT ? <Link href="/settings/landlord" className="w-full flex items-center py-1 px-2 hover:bg-accent rounded text-sm">
                            <HiOutlineHomeModern className="mr-2 h-4 w-4" />
                            <span>Tài khoản chủ nhà trọ</span>
                            <ChevronRight className="ml-auto h-4 w-4" />
                        </Link> : <Link href="https://oupia-landlord.vercel.app/" className="w-full flex items-center py-1 px-2 hover:bg-accent rounded text-sm">
                            <HiOutlineHomeModern className="mr-2 h-4 w-4" />
                            <span>Tài khoản chủ nhà trọ</span>
                            <ChevronRight className="ml-auto h-4 w-4" />
                        </Link>
                    }
                    <Link href="/reputation-points" className="w-full flex items-center py-1 px-2 hover:bg-accent rounded text-sm">
                        <PiHandHeart className="mr-2 h-4 w-4" />
                        <h5>Điểm tiếng tăm:  <span className={cn('font-semibold', user.reputationScore > 0 ? "text-emerald-500" : "text-rose-500")}>{user.reputationScore ?? 0}</span></h5>
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
                <div onClick={handleLogOut} className="w-full flex items-center py-1 px-2 hover:bg-accent rounded text-sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default UserPopover;