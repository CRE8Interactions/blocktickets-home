import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { getEvent } from '../../utilities/api';

import { Sidenav } from '../../components';

export default function DashboardPage() {
    const { uuid } = useParams()
    const [event, setEvent] = useState()
    useEffect(() => {
        getEvent(uuid)
            .then((res) => setEvent(res.data))
    }, [uuid])

    return (
        <>
            <Sidenav event={event} />
            <div className='spacer-md'>
                <Outlet />
            </div>
        </>
    )
}