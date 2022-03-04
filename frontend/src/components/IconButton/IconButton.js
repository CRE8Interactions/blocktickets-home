import React, { Fragment, useContext, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import Button from 'react-bootstrap/Button';

import './iconButton.scss';

export default function IconButton({ children, styles, variant }) {
	return (
		<Button className={styles} variant={variant}>
			<span className="d-flex btn--tickets icon-button">{children}</span>
		</Button>
	);
}
