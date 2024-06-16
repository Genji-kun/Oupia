/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactMapGL, { Layer, Marker, Source } from '@goongmaps/goong-map-react';
import { useFindAssetContext } from '@/contexts/find-asset-context';
import geoJsonProv from "@/public/data/geoJson1.json";
import geoJsonDist from "@/public/data/geoJson2.json";
import { toast } from 'sonner';
import Image from 'next/image';
import AssetItem from './asset-item';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const MapContainer = () => {

    const { selectedProv, selectedDist, setSelectedDist, assetResults, setPolyReq, assetsByPolygon, isFetchingPolygon } = useFindAssetContext();
    const mapRef = useRef<any>(null);

    const [polygon, setPolygon] = React.useState<string>("");
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
            setSelectedDist(undefined);
            const feature = geoJsonProv.features.find((f: any) => f.properties.NAME_1 === normalizeName(selectedProv.name));
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
                setPolygon(listPolygon[0]);
                setViewport({
                    ...viewport,
                    longitude: (bounds[0][0] + bounds[1][0]) / 2,
                    latitude: (bounds[0][1] + bounds[1][1]) / 2,
                    zoom: 9
                });
            }
        }
    }, [selectedProv])

    useEffect(() => {
        if (selectedDist) {
            const feature = geoJsonDist.features.find((f: any) => f.properties.NAME_2 === normalizeName(selectedDist.name.replace(selectedDist.typeText.substring(0, 9), "").trim()));
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
                setPolygon(listPolygon[0]);
                setViewport({
                    ...viewport,
                    longitude: (bounds[0][0] + bounds[1][0]) / 2,
                    latitude: (bounds[0][1] + bounds[1][1]) / 2,
                    zoom: 13
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

    useEffect(() => {
        if (polygon) {
            setPolyReq(polygon);
        }
    }, [polygon])

    useEffect(() => {
        if (!!assetResults?.length) {
            setViewport({
                ...viewport,
                longitude: assetResults?.[0]?.locationLong,
                latitude: assetResults?.[0]?.locationLat,
                zoom: 11,
            });
        }
    }, [assetResults])

    const onMapLoad = useCallback((event: any) => {
        mapRef.current = event.target;
    }, []);

    const markers = useMemo(() => {
        if (assetsByPolygon && assetsByPolygon.length > 0 || isFetchingPolygon) {
            return assetsByPolygon && assetsByPolygon.map((asset, index) => (
                <Marker className="relative z-[1]" key={index} longitude={asset.locationLong} latitude={asset.locationLat}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="p-1 rounded-full bg-gray-400 hover:bg-gray-500 cursor-pointer">
                                <Image width={500}
                                    height={500}
                                    src={asset.images[0]}
                                    className="object-cover w-16 h-16 rounded-full"
                                    alt="Asset Image" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent align='center' className="w-96 py-4 z-[99999]">
                            <AssetItem asset={asset} />
                        </PopoverContent>
                    </Popover>
                </Marker>
            ))
        } else if (assetResults && assetResults.length > 0) {
            return assetResults.map((asset, index) => (
                <Marker className="relative z-[1]" key={index} longitude={asset.locationLong} latitude={asset.locationLat}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="p-1 rounded-full bg-gray-400 hover:bg-gray-500 cursor-pointer">
                                <Image width={500}
                                    height={500}
                                    src={asset.images[0]}
                                    className="object-cover w-16 h-16 rounded-full"
                                    alt="Asset Image" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent align='center' className="w-96 py-4 z-[99999]">
                            <AssetItem asset={asset} />
                        </PopoverContent>
                    </Popover>
                </Marker>
            ))
        }
        else {
            return null;
        }
    }, [assetResults, assetsByPolygon]);


    function normalizeName(name: string) {
        if (/^\d+$/.test(name)) {
            return 'Quận' + name;
        }
        return name.replaceAll(" ", "");
    }

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
                            filter={['==', ['get', 'NAME_1'], normalizeName(selectedProv.name)]}
                        />
                        <Layer
                            id="fill"
                            type="fill"
                            paint={{
                                'fill-color': '#FF0000',
                                'fill-opacity': 0.1
                            }}
                            filter={['==', ['get', 'NAME_1'], normalizeName(selectedProv.name)]}
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
                            filter={['==', ['get', 'NAME_2'], normalizeName(selectedDist.name.replace(selectedDist.typeText.substring(0, 9), "").trim())]}
                        />
                        <Layer
                            id="fill"
                            type="fill"
                            paint={{
                                'fill-color': '#FF0000',
                                'fill-opacity': 0.1
                            }}
                            filter={['==', ['get', 'NAME_2'], normalizeName(selectedDist.name.replace(selectedDist.typeText.substring(0, 9), "").trim())]}
                        />
                    </Source>
                )}
                {markers}
            </ReactMapGL>

        </div>
    );
};

export default MapContainer;