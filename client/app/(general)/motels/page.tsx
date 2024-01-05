import React from 'react';
import FilterBar from './_components/filter-bar';
import MotelCotainer from './_components/motel-container';


const MotelsPage = () => {
    return (
        <>
            <div className="h-screen bg-background hidden xl:block fixed left-0 z-100">
                <FilterBar />
            </div>
            <div className="flex h-full w-full">
                <div className="w-96 hidden xl:block"></div>
                <div className=" flex-auto flex flex-col gap-4">
                    <MotelCotainer />
                </div>
            </div>
        </>

    );
};

export default MotelsPage;