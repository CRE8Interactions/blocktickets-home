import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '../../Slider';
import { Ticket } from './Ticket';

export default function MyTicketsSlider({ order, handleClick }) {
    return (
        <div className="page-slider">
            <Slider addedModule="pagination">
                {order && order.tickets.map((ticket, index) => {
                    return (
                        <SwiperSlide className='swiper-lazy' key={index}>
                            <Ticket ticket={ticket} key={index} order={order} handleClick={handleClick} />
                        </SwiperSlide>
                    )
                })
                }
            </Slider>
        </div>
    );
}
