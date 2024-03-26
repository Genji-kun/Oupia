"use client";

import GoogleProvider from '@/components/providers/google-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { CookiesProvider } from 'next-client-cookies/server';
import { store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <CookiesProvider>
            <GoogleProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Provider store={store}>
                        <main>
                            {children}
                        </main>
                    </Provider >
                </ThemeProvider>
            </GoogleProvider>
        </CookiesProvider>
    );
};

export default Providers;