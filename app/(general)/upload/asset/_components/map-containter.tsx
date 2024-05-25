"use client"

import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from '@goongmaps/goong-map-react';
import { PiMapPinFill } from "react-icons/pi";


const MapContainer = ({ longitude, latitude }: { longitude: number, latitude: number }) => {

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 21.02800,
        longitude: 105.83991,
        zoom: 9
    });


    useEffect(() => {
        if (longitude && latitude) {
            setViewport(prevViewport => ({
                ...prevViewport,
                longitude: longitude,
                latitude: latitude,
                zoom: 15, 
                transitionDuration: 1000
            }));
        }
    }, [longitude, latitude]);


    return (
        <div className="aspect-[2/1] w-full overflow-hidden rounded relative">
            <ReactMapGL
                {...viewport}
                goongApiAccessToken={process.env.NEXT_PUBLIC_GOONG_MAPS_MAPTILES_KEY}
                onViewportChange={(nextViewport: any) => setViewport(nextViewport)}>
                {longitude && latitude &&
                    <Marker draggable latitude={latitude} longitude={longitude} offsetLeft={-20} offsetTop={-10}>
                        <PiMapPinFill className="w-5 h-5 fill-primary"/>
                    </Marker>
                }
            </ReactMapGL>

        </div>
    );
};

export default MapContainer;