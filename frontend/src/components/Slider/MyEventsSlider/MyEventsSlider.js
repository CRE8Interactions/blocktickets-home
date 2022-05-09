import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TicketCard } from '../../TicketCard';

export default function MyEventsSlider({ order, tickets }) {
	return (
		<div className="page-slider">
			<Slider>
				{/* {order &&
					tickets &&
					tickets.map((ticket, index) => {
						return ( */}
				<SwiperSlide>
					<TicketCard />
				</SwiperSlide>
				<SwiperSlide>
					<TicketCard />
				</SwiperSlide>
				{/* );
					})} */}
			</Slider>
		</div>
	);
}
