import React, { Fragment, useEffect, useState } from 'react';

import { getEvents, getVenues } from '../../utilities/api';

import { Venues, Hero, Events, Footer } from '../../components';

export default function HomePage() {
    const [events, setEvents] = useState()
    const [venues, setVenues] = useState()

    useEffect(() => {
        getEvents()
            .then((res) => setEvents(res.data))
            .catch((err) => console.error(err))

        getVenues()
            .then((res) => setVenues(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <Fragment>
            <main>
                <Hero events={events} />
                <Events events={events} />
                <Venues venues={venues} />
            </main>
            <Footer />
        </Fragment>
    );
}
