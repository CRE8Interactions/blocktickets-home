import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '../../Slider';
import { Tickets } from '../Tickets';

export default function MyTicketsSlider({ order, id, handleClick }) {
    return (
        <div className="page-slider">
            <Slider addedModule="pagination">
                {order && order.tickets.map((ticket, index) => {
                    return (
                        <SwiperSlide className='swiper-lazy' key={index}>
                            <Tickets ticket={ticket} key={index} order={order} handleClick={handleClick} />
                        </SwiperSlide>
                    )
                })
                }
            </Slider>
        </div>
    );
}
