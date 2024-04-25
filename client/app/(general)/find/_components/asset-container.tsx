"use client";


import React from 'react';
import SearchBar from './search-bar';
import { AnimatePresence, motion } from "framer-motion";
import MapContainer from './map-container';
import AssetList from './asset-list';
import { useFindAssetContext } from '@/contexts/find-asset-context';


const AssetContainer = () => {

    const { openSearch, openMap } = useFindAssetContext();

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            {openMap ?
                <MapContainer />
                :
                <>
                    <AnimatePresence>
                        {openSearch && <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.1, ease: "easeInOut" }}>
                            {/* <SearchBar /> */}
                        </motion.div>}
                    </AnimatePresence>
                    <div className="px-4 w-full flex-grow">
                        <AssetList />
                    </div>
                </>
            }
        </div>
    );
};

export default AssetContainer;