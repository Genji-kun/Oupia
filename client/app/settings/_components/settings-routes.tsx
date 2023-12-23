import { settingsRoutes } from '@/utils/routes';
import React from 'react';
import SettingsRouteItem from './settings-routes-item';

const SettingsRoutes = () => {
    return (
        <div className="w-full overflow-x-auto">
            <ul className="flex md:flex-col ">
                <>
                    {settingsRoutes.map((route, index) => {
                        return (<li key={index}>
                            <SettingsRouteItem route={route} />
                        </li>);
                    })}
                </>
            </ul>
        </div>
    );
};

export default SettingsRoutes;