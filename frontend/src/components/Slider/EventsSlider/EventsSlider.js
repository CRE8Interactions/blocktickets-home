import React, { Fragment } from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '../../Slider';
import { MyCard } from '../../Card';

export default function EventsSlider({ events }) {
	const prefix = 'event';

	return (
		<Fragment>
			<Slider>
				{events &&
					events.map((event, index) => {
						return (
							<SwiperSlide key={index} className="swiper-lazy">
								<MyCard prefix={prefix} type="genAdmission" event={event} />
							</SwiperSlide>
						);
					})}
			</Slider>
		</Fragment>
	);
}
