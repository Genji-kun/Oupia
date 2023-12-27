import Link from 'next/link';
import React from 'react';
import NavbarLogo from './navbar/navbar-logo';

const Footer = () => {
    return (
        <>
            <footer className="bg-background rounded-lg shadow">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <Link href={"/"} className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <NavbarLogo />
                        </Link>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link href={"/"} className="hover:underline">Oupia™</Link>. All Rights Reserved.</span>
                </div >
            </footer >
        </>
    );
};

export default Footer;