"use client"

import React from 'react';
import SignInTab from './sign-in-tab';
import ForgetPasswordTab from './forget-password-tab';
import { useAuthTabContext } from '@/contexts/auth-tab-context';
import { AnimatePresence, motion } from 'framer-motion';
import ChangePasswordTab from './change-password-tab';
import { Loader2 } from 'lucide-react';
import OtpTab from './otp-tab';
import NewPasswordTab from './new-password-tab';

const Tabs = () => {

    const { tab, isLoading } = useAuthTabContext();

    // useEffect(() => {

    //     const loginSocial = async (accessToken: string, provider: string) => {
    //         try {
    //             const res = await publicApi.post(authEndpoints["loginSocial"], {
    //                 accessToken: accessToken,
    //                 provider: provider
    //             });
    //             if (res.status === 200) {
    //                 Cookies.set("accessToken", res.data.accessToken);

    //                 // Cập nhât Header Request
    //                 updateAuthApi();

    //                 try {
    //                     const resCurr = await authApi.get(authEndpoints["currentUser"]);
    //                     if (resCurr.status === 200) {
    //                         Cookies.set("user", resCurr.data);
    //                         dispatch(login(resCurr.data));
    //                         router.push("/");
    //                     }
    //                 } catch (error) {
    //                     console.error(error);
    //                 } finally {
    //                     setIsLoading(false);
    //                 }
    //             }
    //         } catch (error: any) {
    //             console.log(error);
    //         }
    //     }

    //     if (session) {
    //         setIsLoading(true);
    //         loginSocial(session.accessToken, "GOOGLE");
    //     }
    // }, [session, dispatch, router, setIsLoading])




    return (
        <>
            <div className="w-full h-full flex justify-center items-center relative">
                <AnimatePresence>
                    {(() => {
                        switch (tab) {
                            case "sign-in":
                                return (
                                    <motion.div
                                        key="sign-in"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="flex flex-col justify-center gap-y-5 absolute w-full p-4 md:py-10 md:px-24 xl:py-16 xl:px-44">
                                        <SignInTab />
                                    </motion.div>
                                );
                            case "forget-password":
                                return (
                                    <motion.div
                                        key="forget-password"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="flex flex-col justify-center gap-y-8 absolute w-full p-4 md:py-10 md:px-24 xl:py-16 xl:px-44">
                                        <ForgetPasswordTab />
                                    </motion.div>
                                );
                            case "change-password":
                                return (
                                    <motion.div
                                        key="change-password"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="flex flex-col justify-center gap-y-8 absolute w-full p-4 md:py-10 md:px-24 xl:py-16 xl:px-44 ">
                                        <ChangePasswordTab />
                                    </motion.div>
                                );
                            case "otp":
                                return (
                                    <motion.div
                                        key="otp"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="flex flex-col justify-center gap-y-8 absolute w-full p-4 md:py-10 md:px-24 xl:py-16 xl:px-44 ">
                                        <OtpTab />
                                    </motion.div>
                                );
                            case "new-password":
                                return (
                                    <motion.div
                                        key="new-password"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="flex flex-col justify-center gap-y-8 absolute w-full p-4 md:py-10 md:px-24 xl:py-16 xl:px-44 ">
                                        <NewPasswordTab />
                                    </motion.div>
                                );
                            default:
                                return null;
                        }
                    })()}
                </AnimatePresence>
                {isLoading && <div className="z-50 absolute inset-0 flex justify-center items-center dark:bg-oupia-base/50 bg-blur-lg">
                    <div className="p-3 rounded-lg bg-oupia-base border-[1.5px] border-oupia-sub">
                        <Loader2 className="animate-spin w-12 h-12" />
                    </div>
                </div>}
            </div>
        </>
    );
};

export default Tabs;
