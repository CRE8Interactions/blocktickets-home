import React, { Fragment } from 'react';
import { SwiperSlide } from 'swiper/react';

import { MyCard } from '../../Card';
import { Slider } from '../../Slider';

// Import Swiper styles
import 'swiper/css';

import './venuesSlider.scss';

export default function VenuesSlider({ layout }) {
	const prefix = 'venue';

	return (
		<Fragment>
			<Slider>
				<SwiperSlide>
					<MyCard prefix={prefix} />
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
