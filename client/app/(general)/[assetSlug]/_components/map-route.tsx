"use client"

import React, { useState } from 'react';
import ReactMapGL from '@goongmaps/goong-map-react';


const MapRoute = () => {
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 21.02800,
        longitude: 105.83991,
        zoom: 9
    });

    return (
        <div className="w-full map-route ">
            <ReactMapGL
                {...viewport}
                // goongApiAccessToken={process.env.NEXT_PUBLIC_GOONG_MAPS_MAPTILES_KEY}
                onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
            />
        </div>
    );
};

export default MapRoute;