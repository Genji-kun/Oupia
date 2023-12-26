import React from 'react';
import "./style.css";
import oupia from "@/public/oupia.svg";
import Image from 'next/image';
import Link from 'next/link';

const NavbarLogo = () => {
    return (
        <Link href="/">
            <div className="logo">
                <Image src={oupia} width={30} alt="Oupia" />
                <h1 className="font-[Montserrat]">Oupia</h1>
            </div>
        </Link>

    );
};

export default NavbarLogo;