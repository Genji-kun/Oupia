"use client"

import { useAssetDetailContext } from '@/contexts/asset-detail-context'
import React from 'react'

function AssetIntroduceSection() {

    const {asset} = useAssetDetailContext();

    return (
        <>
            <h1 className="font-montserrat font-bold text-xl lg:text-3xl">Giới thiệu</h1>
            <div className="my-2">
                <p className="dark:text-muted-foreground">
                    {asset.assetDescription.split('\n').map((line: string, index: number) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </p>
            </div>
        </>
    )
}

export default AssetIntroduceSection
