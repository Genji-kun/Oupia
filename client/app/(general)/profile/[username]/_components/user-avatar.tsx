import Image from 'next/image';
import React from 'react';

const UserAvatar = ({ image }: { image: string }) => {
    return (
        <>
            <Image src={image} alt="User Avatar" width={300} height={300} className="h-40 w-40 rounded-full border-4 border-background" />
        </>
    );
};

export default UserAvatar;