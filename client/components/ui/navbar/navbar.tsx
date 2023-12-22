import React from 'react';
import NavbarLogo from './navbar-logo';
import NavbarMenu from './navbar-menu';
import NavbarRoutes from './navbar-routes';
import "./style.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="flex h-full items-center">
                <div className="hidden md:block">
                    <NavbarLogo />
                </div>
                <NavbarMenu />
                <NavbarRoutes />
            </div>
        </div>
    );
};

export default Navbar;