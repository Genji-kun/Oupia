"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, Layer, Marker, Source } from '@goongmaps/goong-map-react';
import { useAssetDetailContext } from '@/contexts/asset-detail-context';
import { HiMapPin } from 'react-icons/hi2';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useDebounce } from '@/hooks/useDebounce';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, MoveRight, X } from 'lucide-react';
import * as polyline from '@mapbox/polyline';
import { TbMapPinFilled } from 'react-icons/tb';


const MapRoute = () => {

    const { asset, isOpenSearch, setIsOpenSearch } = useAssetDetailContext();

    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [origin, setOrigin] = useState<string>("");
    const [destination, setDestination] = useState<string>("");
    const [steps, setSteps] = useState<any>([]);
    const [direction, setDirection] = useState<any>(null);
    const [geoJSON, setGeoJSON] = useState<any>(null);
    // const []

    const [viewport, setViewport] = useState<any>({
        width: "100%",
        height: "100%",
        latitude: 21.02800,
        longitude: 105.83991,
        zoom: 9
    });

    const inputRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);

    const onMapLoad = useCallback((event: any) => {
        mapRef.current = event.target;
    }, []);

    const fetchData = useDebounce(async (searchQuery: string) => {
        if (searchQuery) {
            try {
                const res = await axios.get(`https://rsapi.goong.io/Place/AutoComplete?input=${searchQuery}, Việt Nam&api_key=${process.env.NEXT_PUBLIC_GOONG_MAPS_API_KEY}&sessionToken=${localStorage.getItem("sessionToken")}`);
                const data = await res.data.predictions;
                if (data) {
                    setResults(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, 500);

    useEffect(() => {
        if (asset) {
            goToLocation(asset.locationLong, asset.locationLat);
            setDestination(asset.locationLat + "," + asset.locationLong)
        }
    }, [asset])

    useEffect(() => {
        setShowResults(results.length > 0 && steps.length === 0);
    }, [results])

    useEffect(() => {
        const getTrip = async () => {
            try {
                const res = await axios.get(`https://rsapi.goong.io/Direction?origin=${origin}&destination=${destination}&vehicle=bike&api_key=${process.env.NEXT_PUBLIC_GOONG_MAPS_API_KEY}`);
                setDirection(res.data);
                setSteps(res.data.routes[0].legs[0].steps)
            } catch (error) {
                console.error(error);
            }
        }
        if (origin && destination) {
            getTrip();
        }
    }, [origin, destination]);

    useEffect(() => {
        const addRouteToMap = () => {
            let originPoint = origin.split(',').map(Number);
            let destinationPoint = destination.split(',').map(Number);
            let bounds = [
                [Math.min(originPoint[1], destinationPoint[1]), Math.min(originPoint[0], destinationPoint[0])],
                [Math.max(originPoint[1], destinationPoint[1]), Math.max(originPoint[0], destinationPoint[0])]
            ];
            mapRef.current?.fitBounds(bounds);
            setViewport({
                ...viewport,
                longitude: (bounds[0][0] + bounds[1][0]) / 2,
                latitude: (bounds[0][1] + bounds[1][1]) / 2,
                zoom: 11
            });
            setIsOpenSearch(false);
        }

        if (direction) {
            let route = direction.routes[0];
            let geometry_string = route.overview_polyline.points;
            setGeoJSON(polyline.toGeoJSON(geometry_string));
            addRouteToMap();
        }

    }, [direction]);

    useEffect(() => {
        !query && setShowResults(false);
    }, [query])

    useEffect(() => {
        fetchData(query);
        return () => {
            fetchData.cancel();
        }
    }, [query, fetchData])


    const marker = useMemo(() =>
        <Marker
            longitude={asset.locationLong}
            latitude={asset.locationLat}
            offsetLeft={-2}
            offsetTop={-4}
            className="flex items-center justify-center">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <TbMapPinFilled className="w-6 h-6 text-heart fill-heart" />
                    </TooltipTrigger>
                    <TooltipContent side="top" align='center'>
                        <p>{asset.assetName}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </Marker>, [asset]);

    const startedMarker = useMemo(() => {
        if (origin) {
            let originPoints = origin.split(',').map(Number);
            return (
                <Marker
                    latitude={originPoints[0]}
                    longitude={originPoints[1]}
                    offsetLeft={-10}
                    offsetTop={-8}
                    className="flex items-center justify-center">
                    <div className="w-6 h-6 bg-yellow-300 rounded-full ring-2 ring-border" />
                </Marker>
            )
        }

    }, [origin]);

    const geteocode = async (placeId: string) => {
        const res = await axios.get(`https://rsapi.goong.io/Place/Detail?place_id=${placeId}&api_key=${process.env.NEXT_PUBLIC_GOONG_MAPS_API_KEY}`);
        const data = await res.data;
        setOrigin(data.result.geometry.location.lat + "," + data.result.geometry.location.lng);
        setQuery(data.result.formatted_address);
    }

    const handleSelect = (evt: any) => {
        geteocode(evt.target.dataset.placeId);
        setShowResults(false);
    }


    const goToLocation = (longitude: number, latitude: number) => {
        setViewport({
            ...viewport,
            longitude: longitude,
            latitude: latitude,
            zoom: 14,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator(),
        });
    };

    const handleClearData = () => {
        setOrigin("");
        setSteps([]);
        setQuery("");
    }

    return (
        <>
            <div className="w-full map-route">
                <ReactMapGL
                    {...viewport}
                    onLoad={onMapLoad}
                    className="rounded"
                    goongApiAccessToken={process.env.NEXT_PUBLIC_GOONG_MAPS_MAPTILES_KEY}
                    onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
                >
                    {marker}
                    {steps.length > 0 && geoJSON && <>
                        {startedMarker}
                    </>}
                    {
                        steps.length > 0 && geoJSON && (
                            <Source id="province-source" type="geojson" data={geoJSON}>
                                <Layer
                                    id="line"
                                    type="line"
                                    source={"routes"}
                                    layout={{
                                        'line-join': 'round',
                                        'line-cap': 'round'
                                    }}
                                    paint={{
                                        'line-color': '#888',
                                        'line-width': 8
                                    }}
                                />
                            </Source>)
                    }
                    <div className={cn("absolute flex items-center gap-2 top-2 right-2 transition-all", isOpenSearch ? " translate-y-0 opacity-1" : "-translate-y-20 opacity-0")}>
                        <div className="relative space-y-2 w-full bg-background dark:bg-oupia-sub rounded-lg" ref={inputRef}>
                            <div className="relative">
                                {
                                    steps.length > 0 && <Button onClick={handleClearData} variant={"ghost"} className="w-fit h-fit p-1 rounded-lg absolute z-10 right-2 top-1/2 -translate-y-1/2">
                                        <X className="w-4 h-4" />
                                    </Button>
                                }
                                <Input
                                    disabled={steps.length > 0}
                                    value={query}
                                    onChange={(evt) => { setQuery(evt.target.value) }}
                                    placeholder='Nhập địa điểm bắt đầu của bạn...'
                                    className="w-full min-w-[40rem] dark:bg-oupia-base" />
                            </div>

                            {
                                showResults &&
                                <ScrollArea className="absolute z-10 bottom-2 w-full rounded border border-t-0 rounded-t-none py-2 dark:bg-oupia-base">
                                    <div className="flex flex-col px-2">
                                        {results.map((result, index) => {
                                            return (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        key={index}
                                                        className="justify-start"
                                                        onClick={(evt) => handleSelect(evt)} data-place-id={result.place_id}>
                                                        {result.description}
                                                    </Button>
                                                    <Separator />
                                                </>

                                            );
                                        })}
                                    </div>
                                </ScrollArea>

                            }
                        </div>

                    </div>
                </ReactMapGL>
            </div>
            {
                steps.length > 0 && (
                    <>
                        <Separator className="mt-4 mb-2" />
                        <h3 className='text-3xl font-semibold font-montserrat mb-2'>Lộ trình di chuyển đến căn hộ</h3>
                        <div className="flex flex-1 gap-2 items-center text-muted-foreground">
                            <Input readOnly value={query} />
                            <MoveRight className="text-foreground w-10 h-10" />
                            <Input readOnly value={asset.fullLocation} />
                        </div>
                        <ScrollArea className="max-h-96 w-full rounded-lg dark:bg-oupia-base p-4">
                            <ol className="relative border-s border-muted-foreground w-full">
                                {steps.map((step: any, index: number) =>
                                    <li className="mb-6 ms-4" key={index}>
                                        <div className="absolute w-3 h-3 bg-muted-foreground rounded-full mt-1.5 -start-1.5 border border-muted-foreground"></div>
                                        <h3 className="text-lg font-semibold ">{step.html_instructions}{steps.length !== index + 1 && <span> - {step.distance.text} </span>}</h3>
                                        {steps.length !== index + 1 && <p className="mb-4 text-sm text-muted-foreground">Thời gian ước tính: <span className="text-foreground">{step.duration.text}</span></p>}
                                    </li>
                                )}
                            </ol>
                        </ScrollArea>
                    </>

                )
            }
        </>
    );
};

export default MapRoute;