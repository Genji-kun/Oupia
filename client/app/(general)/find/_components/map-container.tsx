/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactMapGL, { Layer, Marker, Source } from '@goongmaps/goong-map-react';
import { useFindAssetContext } from '@/contexts/find-asset-context';
import geoJsonProv from "@/public/data/geoJson1.json";
import geoJsonDist from "@/public/data/geoJson2.json";
import { toast } from 'sonner';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AssetItem from './asset-item';



const MapContainer = () => {

    const { selectedProv, selectedDist, assets, setPolyReq , assetsByPolygon} = useFindAssetContext();
    const mapRef = useRef<any>(null);

    const [polygon, setPolygon] = React.useState<string[]>([]);
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
                setPolygon(listPolygon);
                setViewport({
                    ...viewport,
                    longitude: (bounds[0][0] + bounds[1][0]) / 2,
                    latitude: (bounds[0][1] + bounds[1][1]) / 2,
                });
            }
        }
    }, [selectedProv])

    useEffect(() => {
        if (selectedDist) {
            const feature = geoJsonDist.features.find((f: any) => f.properties.NAME_2 === normalizeName(selectedDist.name));
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

    useEffect(() => {
        if (polygon[0])
            setPolyReq(polygon[0]);
    }, [polygon])

    const onMapLoad = useCallback((event: any) => {
        mapRef.current = event.target;
    }, []);

    const markers = assetsByPolygon ?  useMemo(() => assetsByPolygon && assetsByPolygon.map((asset, index) => (
            <Marker className="relative z-[1]" key={index} longitude={asset.locationLong} latitude={asset.locationLat}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="p-1 rounded-full bg-gray-400 hover:bg-gray-500 cursor-pointer">
                                <Image width={500}
                                    height={500}
                                    src={asset.images[0]}
                                    className="object-cover w-16 h-16 rounded-full"
                                    alt="Asset Image" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent align='center' className="w-96 py-2 z-[99999]">
                            <AssetItem asset={asset} />
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </Marker>
        )
    ), [assets]) : useMemo(() => assets && assets.map(
        (asset, index) => (
            <Marker className="relative z-[1]" key={index} longitude={asset.locationLong} latitude={asset.locationLat}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="p-1 rounded-full bg-gray-400 hover:bg-gray-500 cursor-pointer">
                                <Image width={500}
                                    height={500}
                                    src={asset.images[0]}
                                    className="object-cover w-16 h-16 rounded-full"
                                    alt="Asset Image" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent align='center' className="w-96 py-2 z-[99999]">
                            <AssetItem asset={asset} />
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </Marker>
        )
    ), [assets]);

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
                            filter={['==', ['get', 'NAME_2'], normalizeName(selectedDist.name)]}
                        />
                        <Layer
                            id="fill"
                            type="fill"
                            paint={{
                                'fill-color': '#FF0000',
                                'fill-opacity': 0.1
                            }}
                            filter={['==', ['get', 'NAME_2'], normalizeName(selectedDist.name)]}
                        />
                    </Source>
                )}
                {markers}
            </ReactMapGL>

        </div>
    );
};

export default MapContainer;