"use client"

import React, { useEffect, useState } from 'react';
import ReactMapGL from '@goongmaps/goong-map-react';


const MapContainer = () => {
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 21.02800,
        longitude: 105.83991,
        zoom: 9
    });

    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_GOONG_MAPS_API_KEY);
    }, [])


    return (
        <div className="map-container w-full">
            <ReactMapGL
                {...viewport}
                goongApiAccessToken={process.env.NEXT_PUBLIC_GOONG_MAPS_MAPTILES_KEY}
                onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
            />
        </div>
    );
};

export default MapContainer;