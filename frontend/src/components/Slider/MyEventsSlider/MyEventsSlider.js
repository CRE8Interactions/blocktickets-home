import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TicketCard } from '../../TicketCard';

export default function MyEventsSlider({ order }) {
	return (
		<div className="page-slider">
			<Slider>
				{ order && order.upcoming.map((o, index) => {
					return(
						<SwiperSlide key={index}>
							<TicketCard event={o.event} tickets={o.tickets} order={o} />
						</SwiperSlide>
					)
				})}
			</Slider>
		</div>
	);
}
