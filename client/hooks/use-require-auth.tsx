"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useRequireAuth = (currentUser: any) => {
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push("/sign-in");
        }
    }, [currentUser, router]);

    return currentUser;
};

export default useRequireAuth;
