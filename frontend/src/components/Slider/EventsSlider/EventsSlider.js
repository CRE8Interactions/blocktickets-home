import React, { Fragment } from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '../../Slider';
import { MyCard } from '../../Card';

// Import Swiper styles
import 'swiper/css';

import './eventsSlider.scss';

export default function EventsSlider({ layout, events }) {
	const prefix = 'event';

	return (
		<Fragment>
			<Slider>
				{ events && events.map((event, index) => {
					return(
						<SwiperSlide key={index}>
							<MyCard prefix={prefix} type="genAdmission" event={event} />
						</SwiperSlide>
					)
				})
				}
			</Slider>
		</Fragment>
	);
}
