"use client";

import React from 'react';
import NavbarLogo from './Logo';
import NavbarMenu from './Menu';
import NavbarRoutes from './Routes';
import NavbarUser from './UserPopover';
import { useSelector } from 'react-redux';
import { cn } from "@/lib/utils";
import UnAuthorizedHeader from './UnAuthorizedHeader';

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
        <header className={cn("bg-background dark:bg-oupia-base p-4 border-b h-[60px] lg:h-[80px] w-full fixed inset-x-0 top-0 shadow z-50")} >
            <nav className="flex h-full items-center justify-between container">
                <div className="hidden lg:flex gap-20 items-center">
                    <NavbarLogo />
                    <NavbarRoutes />
                </div>
                <NavbarMenu />
                <>
                    {currentUser ? <NavbarUser user={currentUser} /> : <UnAuthorizedHeader />}
                </>
            </nav>
        </header>
    );
};

export default Header;
