import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TicketCard } from '../../TicketCard';

export default function MyTicketsSlider({ id }) {
	return (
		<div className="page-slider">
			<Slider>
				{/* {order &&
					tickets &&
					tickets.map((ticket, index) => {
						return ( */}
				<SwiperSlide>
					<TicketCard id={id} />
				</SwiperSlide>
				<SwiperSlide>
					<TicketCard id={id} />
				</SwiperSlide>
				{/* );
					})} */}
			</Slider>
		</div>
	);
}
