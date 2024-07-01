"use client"

import { useFindAssetContext } from '@/contexts/find-asset-context';
import { cn } from '@/lib/utils';
import React from 'react'

function MaxPeopleSection() {

    const { maxPeople, setMaxPeople } = useFindAssetContext();

    const handleMaxPeopleChange = (event: any) => {
        setMaxPeople(event.target.value);
    };
    return (
        <div className="flex flex-col gap-y-2">
            <h2 className="font-semibold text-lg">Số người cư trú</h2>
            <ul className="flex flex-nowrap overflow-x-auto gap-2 pb-2">
                <li>
                    <input onChange={handleMaxPeopleChange} type="radio" id="maxPeopleOne" name="maxPeople" value="1" className="hidden" />
                    <label htmlFor="maxPeopleOne" className={cn("text-nowrap flex items-center justify-between px-4 py-2 bg-background dark:bg-oupia-base border rounded-lg cursor-pointer  hover:bg-accent dark:hover:bg-oupia-sub", maxPeople === "1" && "bg-accent dark:bg-oupia-sub border-primary text-primary")}>
                        <span>&#62; 1 người</span>
                    </label>
                </li>
                <li>
                    <input onChange={handleMaxPeopleChange} type="radio" id="maxPeopleTwo" name="maxPeople" value="2" className="hidden" />
                    <label htmlFor="maxPeopleTwo" className={cn("text-nowrap flex items-center justify-between px-4 py-2 bg-background dark:bg-oupia-base border rounded-lg cursor-pointer hover:bg-accent dark:hover:bg-oupia-sub", maxPeople === "2" && "bg-accent dark:bg-oupia-sub border-primary text-primary")}>
                        <span>&#62; 2 người</span>
                    </label>
                </li>
                <li>
                    <input onChange={handleMaxPeopleChange} type="radio" id="maxPeopleThree" name="maxPeople" value="3" className="hidden" />
                    <label htmlFor="maxPeopleThree" className={cn("text-nowrap flex items-center justify-between px-4 py-2 bg-background dark:bg-oupia-base border rounded-lg cursor-pointer hover:bg-accent dark:hover:bg-oupia-sub", maxPeople === "3" && "bg-accent dark:bg-oupia-sub border-primary text-primary")}>
                        <span>&#62; 3 người</span>
                    </label>
                </li>
                <li>
                    <input onChange={handleMaxPeopleChange} type="radio" id="maxPeopleFour" name="maxPeople" value="4" className="hidden" />
                    <label htmlFor="maxPeopleFour" className={cn("text-nowrap flex items-center justify-between px-4 py-2 bg-background dark:bg-oupia-base border rounded-lg cursor-pointer hover:bg-accent dark:hover:bg-oupia-sub", maxPeople === "4" && "bg-accent dark:bg-oupia-sub border-primary text-primary")}>
                        <span>&#62; 4 người</span>
                    </label>
                </li>
                <li>
                    <input onChange={handleMaxPeopleChange} type="radio" id="maxPeopleUnlimited" name="maxPeople" value="5" className="hidden" />
                    <label htmlFor="maxPeopleUnlimited" className={cn("text-nowrap flex items-center justify-between px-4 py-2 bg-background dark:bg-oupia-base border rounded-lg cursor-pointer hover:bg-accent dark:hover:bg-oupia-sub", maxPeople === "5" && "bg-accent dark:bg-oupia-sub border-primary text-primary")}>
                        <span> &#62; 5 người</span>
                    </label>
                </li>
            </ul>
        </div>
    )
}

export default MaxPeopleSection
