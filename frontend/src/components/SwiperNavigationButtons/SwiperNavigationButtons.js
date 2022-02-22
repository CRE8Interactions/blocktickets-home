import React, { Fragment, useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import rightArrow from '../../assets/icons/right-arrow.svg';
import leftArrow from '../../assets/icons/left-arrow.svg';
import './swiperNavigationButtons.scss';

export default function SwiperNavigationButtons() {
	return (
		<div className="d-flex justify-content-center">
			<Button variant="outline-light" className="btn--circle">
				<img src={leftArrow} />
			</Button>
			<Button variant="outline-light" className="btn--circle">
				<img src={rightArrow} />
			</Button>
		</div>
	);
}
