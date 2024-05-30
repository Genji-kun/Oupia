"use client"

import React from 'react'
import UploadModeTab from './upload-mode-tab'
import UploadButton from './upload-button'
import PostUtilitiesBox from './post-utilities-box'
import { usePathname } from 'next/navigation'

function UtilitiesBar() {
    const pathname = usePathname();

    return (
        <>
            <div className="w-full h-full rounded-xl bg-background dark:bg-oupia-base shadow-light-theme shadow-dark-theme flex flex-col p-4 gap-4">
                <UploadModeTab />
                {pathname === "/upload" && <PostUtilitiesBox />}
                <UploadButton />
            </div>
        </>
    )
}

export default UtilitiesBar;