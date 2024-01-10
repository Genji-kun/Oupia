import Link from 'next/link';
import React from 'react';
import NavbarLogo from './navbar/navbar-logo';
import { Separator } from './separator';

const Footer = () => {
    return (
        <>
            <footer className="bg-background shadow">
                <div className="w-full p-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div>
                            <NavbarLogo />
                        </div>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <Link href="#" className="hover:underline me-4 md:me-6">About</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline me-4 md:me-6">Licensing</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-gray-500 sm:text-center dark:text-gray-400">© 2023 - 2024 <Link href="/" className="hover:underline">Oupia™</Link>. All Rights Reserved.</span>
                </div>
            </footer >
        </>
    );
};

export default Footer;