"use client";

import React from 'react';
import NavbarLogo from './Logo';
import NavbarMenu from './Menu';
import NavbarRoutes from './Routes';
import { useSelector } from 'react-redux';
import { cn } from "@/lib/utils";
import UnAuthorizedHeader from './UnAuthorizedHeader';
import Hydration from '../Hydration';
import UserPopover from './UserPopover';

const Header = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    // const [authToken, setAuthToken] = useState<any>();

    // useEffect(() => {
    //     if (currentUser) {
    //         const getFbToken = async () => {
    //             try {
    //                 const res = await authApi.get(authEndpoints["getAuthToken"]);
    //                 setAuthToken(res.data);
    //             } catch (error) {
    //                 console.error(error);
    //             }
    //         }
    //         getFbToken();
    //     }
    // }, [currentUser])


    return (
        <Hydration>
            <header className={cn("bg-background dark:bg-oupia-base p-4 border-b h-[60px] lg:h-[80px] w-full fixed inset-x-0 top-0 shadow z-50")} >
                <nav className="flex h-full items-center justify-between container">
                    <div className="hidden lg:flex gap-20 items-center">
                        <NavbarLogo />
                        <NavbarRoutes />
                    </div>
                    <NavbarMenu />
                    {currentUser ? <UserPopover user={currentUser} /> : <UnAuthorizedHeader />}
                </nav>
            </header>
        </Hydration>
    );
};

export default Header;
