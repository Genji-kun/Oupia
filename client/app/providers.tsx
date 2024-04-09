"use client";

import GoogleProvider from '@/components/providers/google-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { store } from '@/redux/store';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { v4 as uuid } from 'uuid';

const Providers = ({ children }: { children: React.ReactNode }) => {

    useEffect(() => {
        if (!localStorage.getItem("sessionToken")) {
            const token = uuid();
            localStorage.setItem("sessionToken", token);
        }
    }, [])

    return (
        <GoogleProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <Provider store={store}>
                    <main>
                        {children}
                    </main>
                </Provider >
            </ThemeProvider>
        </GoogleProvider>
    );
};

export default Providers;