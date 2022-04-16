import React, { Fragment } from 'react';
import { SwiperSlide } from 'swiper/react';

import { MyCard } from '../../Card';
import { Slider } from '../../Slider';

// Import Swiper styles
import 'swiper/css';

import './venuesSlider.scss';

export default function VenuesSlider({ layout, venues }) {
	const prefix = 'venue';

	return (
		<Fragment>
			<Slider>
				{ venues &&
					venues.map((venue, index) => {
						return (
							<SwiperSlide key={index}>
								<MyCard prefix={prefix} venue={venue} />
							</SwiperSlide>
						)
					})
				}
			</Slider>
		</Fragment>
	);
}
