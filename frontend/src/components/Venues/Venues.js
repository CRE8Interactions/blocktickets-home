import React, { useRef } from 'react';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { VenuesSlider } from './VenuesSlider';

import './venues.scss';

export default function Venues({ venues }) {

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null)

    return (
        <section className="spacer">
            <div className="section-heading">
                <h1>Venues</h1>
                <SwiperNavigationButtons navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} />
            </div>
            <div>
                <VenuesSlider venues={venues} navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} />
            </div>
        </section>
    );
}
