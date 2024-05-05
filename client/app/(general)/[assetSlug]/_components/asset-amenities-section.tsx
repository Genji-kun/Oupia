"use client"

import { Badge } from '@/components/ui/badge';
import { useAssetDetailContext } from '@/contexts/asset-detail-context'
import { Dot } from 'lucide-react';
import React from 'react'

function AssetAmenitiesSection() {

    const { asset } = useAssetDetailContext();

    return (
        <>
            {
                asset.amenities &&
                <>
                    <h1 className="font-montserrat font-bold text-xl lg:text-3xl">Các tiện ích của căn hộ</h1>
                    <div className="my-2 flex gap-2 flex-wrap">
                        {
                            asset.amenities.map((amenity: string, index: number) => {
                                return <React.Fragment key={index}>
                                    <Badge className="border text-white bg-primary py-1 px-4">
                                        <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lucide lucide-circle-check-big"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>                                            <span className="text-base">
                                                {amenity}
                                            </span>
                                        </div>
                                    </Badge>
                                </React.Fragment>
                            })
                        }
                    </div>
                </>
            }
        </>
    )
}

export default AssetAmenitiesSection
