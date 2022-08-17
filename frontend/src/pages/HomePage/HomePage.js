import React, { Fragment, useEffect, useState, useLayoutEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { getEvents, getVenues } from '../../utilities/api';

import { Venues, Hero, Events, Footer } from '../../components';

import desktopLogo from '../../assets/logo.svg';
import logoLight from '../../assets/logo-light.svg';

export default function HomePage() {
    const [events, setEvents] = useState()
    const [venues, setVenues] = useState()

    const [sectionRef, sectionInView] = useInView({
        threshold: 0.7, rootMargin: "20px 0px 0px 0px"
    });

    useEffect(() => {
        getEvents()
            .then((res) => setEvents(res.data))
            .catch((err) => console.error(err))

        getVenues()
            .then((res) => setVenues(res.data))
            .catch((err) => console.log(err))
    }, [])

    useLayoutEffect(() => {
        const nav = document.querySelector('.navigation')
        const logo = document.querySelector('.navbar-brand img')

        if (sectionInView) {
            nav.classList.add('nav-scrolled')
            logo.src = desktopLogo;
        }

        return () => {
            nav.classList.remove('nav-scrolled')
            logo.src = logoLight
        };
    }, [sectionInView])

    return (
        <Fragment>
            <main>
                <Hero events={events} />
                <div ref={sectionRef}>
                    <Events events={events} />
                    <Venues venues={venues} />
                </div>
            </main>
            <Footer />
        </Fragment>
    );
}
