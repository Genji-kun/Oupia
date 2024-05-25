import { Loader2 } from 'lucide-react';
import React from 'react'

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-full w-full">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
    )
}

export default Loading;
