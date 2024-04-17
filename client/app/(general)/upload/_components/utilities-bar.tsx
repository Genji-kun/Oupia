"use client"

import React, { useEffect } from 'react'
import UploadModeTab from './upload-mode-tab'
import UploadButton from './upload-button'
import PostUtilitiesBox from './post-utilities-box'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import useRequireAuth from '@/hooks/use-require-auth'

function UtilitiesBar() {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const currUser = useRequireAuth(currentUser);
    const router = useRouter();

    if (!currUser) {
        return <> {
            router.push("/sign-in")
        }</>
    }

    return (
        <div className="w-full h-full rounded-xl bg-background dark:bg-oupia-base shadow-light-theme shadow-dark-theme flex flex-col p-4 gap-4">
            <UploadModeTab />
            <PostUtilitiesBox />
            <UploadButton />
        </div>
    )
}

export default UtilitiesBar;