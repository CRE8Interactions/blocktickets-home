import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '../../Slider';
import { TicketCard } from '../../TicketCard';

export default function MyCollectablesSlider({ navigationNextRef, navigationPrevRef }) {

    // will come from database
    const ticketType = 'collectable';

    return (
        <div className="page-slider">
            <Slider addedModule="pagination" navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef}>
                <SwiperSlide className="swiper-lazy">
                    <TicketCard ticketType={ticketType} />
                </SwiperSlide>
                <SwiperSlide className="swiper-lazy">
                    <TicketCard ticketType={ticketType} />
                </SwiperSlide>
            </Slider>
        </div>
    );
}
