import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '../../Slider';
import { TicketCard } from '../../TicketCard';

export default function UpcomingEventsSlider({ order, tickets }) {
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
				{/* );
					})} */}
			</Slider>
		</div>
	);
}
