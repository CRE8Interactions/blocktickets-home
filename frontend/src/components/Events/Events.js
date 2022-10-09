import React, { useRef } from 'react';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { EventsSlider } from './EventsSlider';

export default function Events({ events }) {

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null)

    return (
        <section className="spacer">
            <div className="section-heading">
                <h1>Trending events</h1>
                <SwiperNavigationButtons navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} />
            </div>
            <div>
                <EventsSlider events={events} navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} />
            </div>
        </section>
    );
}
