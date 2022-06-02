import React, { Fragment } from 'react';
import { SwiperSlide } from 'swiper/react';

import { MyCard } from '../../Card';
import { Slider } from '../../Slider';

export default function VenuesSlider({ venues }) {
	const prefix = 'venue';

	return (
		<Fragment>
			<Slider>
				{venues &&
					venues.map((venue, index) => {
						return (
							<SwiperSlide key={index} className="swiper-lazy">
								<MyCard prefix={prefix} venue={venue} />
							</SwiperSlide>
						);
					})}
			</Slider>
		</Fragment>
	);
}
