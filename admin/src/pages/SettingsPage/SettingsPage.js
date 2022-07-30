import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import { Sidenav } from '../../components';

export default function SettingsPage() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('organization-information')

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