import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '../../Slider';
import { TicketCard } from '../../TicketCard';

export default function MyTicketsSlider({ order, id }) {
    return (
        <div className="page-slider">
            <Slider addedModule="pagination">
                {order &&
                    <SwiperSlide className='swiper-lazy'>
                        <TicketCard order={order} id={id} />
                    </SwiperSlide>
                }
            </Slider>
        </div>
    );
}
