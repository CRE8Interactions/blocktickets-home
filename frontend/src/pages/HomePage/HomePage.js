import React, { Fragment, useEffect, useState } from 'react';

import { getEvents, getVenues } from '../../utilities/api';
import { sortBy } from '../../utilities/helpers';

import { Venues, Hero, Events, Footer } from '../../components';

export default function HomePage() {
    const [events, setEvents] = useState()
    const [venues, setVenues] = useState()

    useEffect(() => {
        getEvents()
            .then((res) => setEvents(sortBy(res.data)))
            .catch((err) => console.error(err))

        getVenues()
            .then((res) => setVenues(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <Fragment>
            <main>
                <Hero />
                <Events events={events} />
                <Venues venues={venues} />
            </main>
            <Footer />
        </Fragment>
    );
}
