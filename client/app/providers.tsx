"use client";

import { ThemeProvider } from '@/components/providers/theme-provider';
import { store } from '@/redux/store';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { v4 as uuid } from 'uuid';

const Providers = ({ children, session }: { children: React.ReactNode, session: any }) => {

    useEffect(() => {
        if (!localStorage.getItem("sessionToken")) {
            const token = uuid();
            localStorage.setItem("sessionToken", token);
        }
    }, [])

    return (
        <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <Provider store={store}>
                    <main>
                        {children}
                    </main>
                </Provider >
            </ThemeProvider>
        </SessionProvider>
    );
};

export default Providers;