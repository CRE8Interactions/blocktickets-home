import React, { Fragment } from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '../../Slider';
import { MyCard } from '../../Card';

export default function EventsSlider({ events, navigationNextRef, navigationPrevRef }) {
    const prefix = 'event';

    return (
        <Fragment>
            <Slider navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef}>
                {events &&
                    events.map((event, index) => {
                        return (
                            <SwiperSlide key={index} className="swiper-lazy">
                                <MyCard prefix={prefix} type="genAdmission" event={event} />
                            </SwiperSlide>
                        );
                    })}
            </Slider>
        </Fragment>
    );
}
