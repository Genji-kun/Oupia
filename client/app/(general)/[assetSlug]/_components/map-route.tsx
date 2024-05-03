"use client"

import React, { useEffect, useMemo, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, Marker } from '@goongmaps/goong-map-react';
import { useAssetDetailContext } from '@/contexts/asset-detail-context';
import { HiMapPin } from 'react-icons/hi2';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const MapRoute = () => {

    const { asset } = useAssetDetailContext();
    const [viewport, setViewport] = useState<any>({
        width: "100%",
        height: "100%",
        latitude: 21.02800,
        longitude: 105.83991,
        zoom: 9
    });

    useEffect(() => {
        asset && goToLocation(asset.locationLong, asset.locationLat);
    }, [asset])

    const marker = useMemo(() =>
        <Marker
            longitude={asset.locationLong}
            latitude={asset.locationLat}
            offsetLeft={-20}
            offsetTop={-10}
            className="flex items-center justify-center">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <HiMapPin className="w-10 h-10 text-heart" />
                    </TooltipTrigger>
                    <TooltipContent align='center'>
                        <p>{asset.assetName}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </Marker>
        , [asset]);

    const goToLocation = (longitude: number, latitude: number) => {
        setViewport({
            ...viewport,
            longitude: longitude,
            latitude: latitude,
            zoom: 12,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator(),
        });
    };

    return (
        <>
            <div className="w-full map-route">
                <ReactMapGL
                    {...viewport}
                    className="rounded"
                    goongApiAccessToken={process.env.NEXT_PUBLIC_GOONG_MAPS_MAPTILES_KEY}
                    onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
                >
                    {marker}
                </ReactMapGL>
            </div>
        </>
    );
};

export default MapRoute;