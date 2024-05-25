"use client"

import React, { useEffect } from 'react'
import UploadModeTab from './upload-mode-tab'
import UploadButton from './upload-button'
import PostUtilitiesBox from './post-utilities-box'
import { useSelector } from 'react-redux'
import { usePathname, useRouter } from 'next/navigation'
import WithAuth from '@/utils/withAuth'

function UtilitiesBar() {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);

    const pathname = usePathname();
    const router = useRouter();

    if (!currentUser) {
        return <> {
            router.push("/sign-in")
        }</>
    }

    return (
        <WithAuth>
            <div className="w-full h-full rounded-xl bg-background dark:bg-oupia-base shadow-light-theme shadow-dark-theme flex flex-col p-4 gap-4">
                <UploadModeTab />
                {pathname === "/upload" && <PostUtilitiesBox />}
                <UploadButton />
            </div>
        </WithAuth>
    )
}

export default UtilitiesBar;