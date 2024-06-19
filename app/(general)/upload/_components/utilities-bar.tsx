"use client"

import React from 'react'
import UploadButton from './upload-button'
import PostUtilitiesBox from './post-utilities-box'

function UtilitiesBar() {

    return (
        <>
            <div className="w-full h-full rounded-xl bg-background dark:bg-oupia-base shadow-light-theme shadow-dark-theme flex flex-col p-4 gap-4">
                <PostUtilitiesBox />
                <UploadButton />
            </div>
        </>
    )
}

export default UtilitiesBar;