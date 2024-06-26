import { voteRoutes } from '@/utils/routes';
import React from 'react'
import VoteSidebarItem from './vote-sidebar-item';

const VoteSidebar = () => {
    return (
        <div className="relative h-full">
            <ul className="flex flex-col sticky top-[96px]">
                <>
                    {voteRoutes.map((route, index) => {
                        return (<li key={index}>
                            <VoteSidebarItem route={route} />
                        </li>);
                    })}
                </>
            </ul>
        </div>
    )
}

export default VoteSidebar;