"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScanEyeIcon } from 'lucide-react';
import { notFound, useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';
import UploadAssetForm from './_components/upload-asset-form';


function UploadAssetPage() {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);

    const router = useRouter();

    if (!currentUser) {
        return <> {
            router.push("/sign-in")
        }</>
    }

    if (currentUser.role === "ROLE_TENANT") {
        notFound();
    }

    return (
        <>
            {
                currentUser && <div className="h-full w-full py-4 px-6">
                    <Tabs defaultValue="form">
                        <TabsList className="bg-oupia-sub p-1 h-fit shadow-dark-theme border">
                            <TabsTrigger value="form" className="px-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div>
                                                <svg className="w-6 h-6 lucide lucide-file-pen-line" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
                                                    <path d="M8 18h1" />
                                                    <path d="M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z" />
                                                </svg>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Chỉnh sửa thông tin</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TabsTrigger>
                            <TabsTrigger value="view" className="px-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div>
                                                <ScanEyeIcon className="w-6 h-6" />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Xem bài đăng</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="form">
                            <UploadAssetForm />
                        </TabsContent>
                        <TabsContent value="view" className="w-full h-full">
                            {/* <PostView /> */}
                        </TabsContent>
                    </Tabs>
                </div>
            }
        </>
    )
}

export default UploadAssetPage