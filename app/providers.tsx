"use client";

import { ThemeProvider } from '@/components/providers/theme-provider';
import { GOOGLE_CLIENT_ID } from '@/lib/constants/SettingSystem';
import { store } from '@/redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { v4 as uuid } from 'uuid';

const Providers = ({ children }: { children: React.ReactNode }) => {

    const queryClient = new QueryClient()

    useEffect(() => {
        if (!localStorage.getItem("sessionToken")) {
            const token = uuid();
            localStorage.setItem("sessionToken", token);
        }
    }, [])

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <main>
                            {children}
                        </main>
                    </Provider >
                </QueryClientProvider>
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
};

export default Providers;