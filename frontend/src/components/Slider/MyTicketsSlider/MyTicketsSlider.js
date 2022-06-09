import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TicketCard } from '../../TicketCard';

export default function MyTicketsSlider({ order }) {
	return (
		<div className="page-slider">
			<Slider addedModule="pagination">
				{order &&
					<SwiperSlide>
						<TicketCard order={order} />
					</SwiperSlide>
				}
			</Slider>
		</div>
	);
}
