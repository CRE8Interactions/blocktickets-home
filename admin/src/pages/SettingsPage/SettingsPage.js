import React, { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import { Sidenav } from '../../components';

export default function SettingsPage() {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/settings') {
            navigate('organization-information')
        }
    }, [])

    return (
        <>
            <Sidenav />
            <div className='spacer-md'>
                <Outlet />
            </div>
        </>
    )
}