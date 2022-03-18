import React from 'react';
import Button from 'react-bootstrap/Button';

import rightArrow from '../../assets/icons/right-arrow.svg';
import leftArrow from '../../assets/icons/left-arrow.svg';
import './swiperNavigationButtons.scss';

export default function SwiperNavigationButtons({ styles }) {
	return (
		<div className={`d-flex ${styles}`}>
			<Button
				variant="outline-light"
				className="btn--icon swiper-button-prev"
				aria-label="left arrow">
				<img src={leftArrow} alt="left arrow" />
			</Button>
			<Button
				variant="outline-light"
				className="btn--icon swiper-button-next"
				aria-label="right arrow">
				<img src={rightArrow} alt="right arrow" />
			</Button>
		</div>
	);
}
