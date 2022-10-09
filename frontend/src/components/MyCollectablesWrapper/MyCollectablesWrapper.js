import React, { useRef } from 'react';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { MyCollectablesSlider } from './MyCollectablesSlider';

export default function MyCollectablesWrapper() {

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null)

    return (
        <section className="spacer-xs" id="my-listings-wrapper">
            <div className="section-heading-sm">
                <h1>My collectables</h1>
                <div className="tablet-desktop-only">
                    <SwiperNavigationButtons navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} />
                </div>
            </div>
            <MyCollectablesSlider navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} />
        </section>
    );
}
