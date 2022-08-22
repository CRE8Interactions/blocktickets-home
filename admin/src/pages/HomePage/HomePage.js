import React, { useEffect, useState } from 'react';
import { getEvents } from '../../utilities/api';

import { HomeWrapper } from '../../components';

export default function HomePage() {
    const [events, setEvents] = useState()
    useEffect(() => {
        getEvents()
            .then((res) => { setEvents(res.data) })
            .catch((err) => console.error(err))
    }, [])
    return (
        <div className="spacer-md">
            <HomeWrapper events={events} />
        </div>
    );
}
