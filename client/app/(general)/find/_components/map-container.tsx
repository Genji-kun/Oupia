/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactMapGL, { Layer, Source } from '@goongmaps/goong-map-react';
import { useFindAssetContext } from '@/contexts/find-asset-context';
import geoJsonProv from "@/public/data/geoJson1.json";
import geoJsonDist from "@/public/data/geoJson2.json";
import { toast } from 'sonner';


const MapContainer = () => {

    const { selectedProv, selectedDist } = useFindAssetContext();
    const mapRef = useRef<any>(null);

    const [polygon, setPolygon] = React.useState<string[]>();
    const [currentLayer, setCurrentLayer] = useState('province');
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 21.02800,
        longitude: 105.83991,
        zoom: 9
    });

    useEffect(() => {
        if (selectedProv) {
            const feature = geoJsonProv.features.find((f: any) => f.properties.NAME_1 === selectedProv.name.replaceAll(" ", ""));
            if (!feature) {
                toast.error("Somthing went wrong !!")
            } else {
                let listPolygon = [];
                const array = feature.geometry.coordinates;

                for (let i = 0; i < array.length; i++) {
                    let subArray = array[i][0];
                    const coordinatesString = subArray.map(c => c.toString().replace(",", " "));
                    if (coordinatesString)
                        listPolygon.push(coordinatesString.join(', '));
                }

                let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

                for (let i = 0; i < array.length; i++) {
                    for (let j = 0; j < array[i][0].length; j++) {
                        let point = array[i][0][j];
                        minX = Math.min(minX, point[0]);
                        minY = Math.min(minY, point[1]);
                        maxX = Math.max(maxX, point[0]);
                        maxY = Math.max(maxY, point[1]);
                    }
                }
                let bounds = [
                    [minX, minY],
                    [maxX, maxY]
                ];
                mapRef.current?.fitBounds(bounds);
                setPolygon(listPolygon);
                setViewport({
                    ...viewport,
                    longitude: (bounds[0][0] + bounds[1][0]) / 2,
                    latitude: (bounds[0][1] + bounds[1][1]) / 2,
                });
            }
        }
    }, [selectedProv])

    React.useEffect(() => {
        if (selectedDist) {
            const feature = geoJsonDist.features.find((f: any) => f.properties.NAME_2 === selectedDist.name.replaceAll(" ", ""));
            if (!feature) {
                toast.error("Somthing went wrong !!")
            } else {
                let listPolygon = [];
                const array = feature.geometry.coordinates;

                for (let i = 0; i < array.length; i++) {
                    let subArray = array[i][0];
                    const coordinatesString = subArray.map(c => c.toString().replace(",", " "));
                    if (coordinatesString)
                        listPolygon.push(coordinatesString.join(', '));
                }

                let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

                for (let i = 0; i < array.length; i++) {
                    for (let j = 0; j < array[i][0].length; j++) {
                        let point = array[i][0][j];
                        minX = Math.min(minX, point[0]);
                        minY = Math.min(minY, point[1]);
                        maxX = Math.max(maxX, point[0]);
                        maxY = Math.max(maxY, point[1]);
                    }
                }
                let bounds = [
                    [minX, minY],
                    [maxX, maxY]
                ];
                mapRef.current?.fitBounds(bounds);
                setPolygon(listPolygon);
                setViewport({
                    ...viewport,
                    longitude: (bounds[0][0] + bounds[1][0]) / 2,
                    latitude: (bounds[0][1] + bounds[1][1]) / 2,
                });
            }

        }
    }, [selectedDist])

    useEffect(() => {
        if (selectedDist) {
            setCurrentLayer('district');
        } else if (selectedProv) {
            setCurrentLayer('province');
        }
    }, [selectedProv, selectedDist]);

    const onMapLoad = useCallback((event: any) => {
        mapRef.current = event.target;
    }, []);

    return (
        <div className="map-container w-full overflow-hidden">
            <ReactMapGL
                {...viewport}
                onLoad={onMapLoad}
                goongApiAccessToken={process.env.NEXT_PUBLIC_GOONG_MAPS_MAPTILES_KEY}
                onViewportChange={(nextViewport: any) => setViewport(nextViewport)} >
                {currentLayer === 'province' && selectedProv && (
                    <Source id="province-source" type="geojson" data={geoJsonProv as any}>
                        <Layer
                            id="line"
                            type="line"
                            paint={{
                                'line-color': '#FF0000',
                                'line-width': 2
                            }}
                            filter={['==', ['get', 'NAME_1'], selectedProv.name.replaceAll(" ", "")]}
                        />
                        <Layer
                            id="fill"
                            type="fill"
                            paint={{
                                'fill-color': '#FF0000',
                                'fill-opacity': 0.1
                            }}
                            filter={['==', ['get', 'NAME_1'], selectedProv.name.replaceAll(" ", "")]}
                        />
                    </Source>
                )}
                {currentLayer === 'district' && selectedDist && (
                    <Source id="district-source" type="geojson" data={geoJsonDist as any}>
                        <Layer
                            id="line"
                            type="line"
                            paint={{
                                'line-color': '#FF0000',
                                'line-width': 2
                            }}
                            filter={['==', ['get', 'NAME_2'], selectedDist.name.replaceAll(" ", "")]}
                        />
                        <Layer
                            id="fill"
                            type="fill"
                            paint={{
                                'fill-color': '#FF0000',
                                'fill-opacity': 0.1
                            }}
                            filter={['==', ['get', 'NAME_2'], selectedDist.name.replaceAll(" ", "")]}
                        />
                    </Source>
                )}
            </ReactMapGL>

        </div>
    );
};

export default MapContainer;