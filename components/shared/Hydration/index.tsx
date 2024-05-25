"use client"

import React, { FC, PropsWithChildren, useEffect, useState } from 'react';

type IHydrationProps = PropsWithChildren<{
    children: React.ReactNode;
}>;

const Hydration: FC<IHydrationProps> = ({ children }) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted ? <>{children}</> : null;

};

export default Hydration;
