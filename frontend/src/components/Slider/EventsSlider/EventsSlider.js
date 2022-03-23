import React, { Fragment } from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '../../Slider';
import { MyCard } from '../../Card';

// Import Swiper styles
import 'swiper/css';

import './eventsSlider.scss';

export default function EventsSlider({ layout }) {
	const prefix = 'event';

	return (
		<Fragment>
			<Slider>
				<SwiperSlide>
					<MyCard prefix={prefix} type="genAdmission" />
				</SwiperSlide>
				<SwiperSlide>
					<MyCard prefix={prefix} />
				</SwiperSlide>
				<SwiperSlide>
					<MyCard prefix={prefix} />
				</SwiperSlide>
				<SwiperSlide>
					<MyCard prefix={prefix} />
				</SwiperSlide>
			</Slider>
		</Fragment>
	);
}
