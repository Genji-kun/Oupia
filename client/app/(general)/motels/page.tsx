import React from 'react';
import MotelCotainer from './_components/motel-container';
import SearchBar from './_components/search-bar';

const MotelsPage = () => {
    return (
        <div className="container h-full flex flex-col items-center">
            <SearchBar />
            <MotelCotainer />
        </div>
    );
};

export default MotelsPage;