import { voteRoutes } from '@/utils/routes';
import React from 'react'
import VoteSidebarItem from './vote-sidebar-item';

const VoteSidebar = () => {
    return (
        <ul className="flex flex-col">
            <>
                {voteRoutes.map((route, index) => {
                    return (<li key={index}>
                        <VoteSidebarItem route={route} />
                    </li>);
                })}
            </>
        </ul>
    )
}

export default VoteSidebar;