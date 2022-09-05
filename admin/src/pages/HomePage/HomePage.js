import React, { useEffect, useState } from 'react';
import { getAllEventStats } from '../../utilities/api';

import { HomeWrapper } from '../../components';

export default function HomePage() {
    const [eventStatus, setEventStatus] = useState()
    useEffect(() => {
        getAllEventStats()
            .then((res) => { setEventStatus(res.data) })
            .catch((err) => console.error(err))
    }, [])
    return (
        <div className="spacer-md">
            <HomeWrapper events={eventStatus} />
        </div>
    );
}
