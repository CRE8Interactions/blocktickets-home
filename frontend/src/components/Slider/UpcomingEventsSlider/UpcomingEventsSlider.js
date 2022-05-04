import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '../../Slider';
import { TicketCard } from '../../TicketCard';

export default function UpcomingEventsSlider({ order, tickets }) {
	return (
		<Slider>
			{order &&
				tickets &&
				tickets.map((ticket, index) => {
					return (
						<SwiperSlide key={index}>
							<TicketCard order={order} ticket={ticket} />
						</SwiperSlide>
					);
				})}
		</Slider>
	);
}
