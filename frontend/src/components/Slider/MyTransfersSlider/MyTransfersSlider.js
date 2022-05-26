import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TransferCard } from '../../TransferCard';

export default function MyTransfersSlider({ transfers, cancel }) {
	return (
		<div className="page-slider">
			<Slider addedModule="pagination">
				{transfers &&
					transfers.map((transfer, index) => {
						return (
							<SwiperSlide key={index}>
								<TransferCard transfer={transfer} cancel={cancel} />
							</SwiperSlide>
						);
					})}
			</Slider>
		</div>
	);
}
