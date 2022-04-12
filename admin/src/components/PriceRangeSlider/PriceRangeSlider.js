import React, { useState } from 'react';
import Slider from 'rc-slider';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

import 'rc-slider/assets/index.css';
import './priceRangeSlider.scss';

export default function PriceRangeSlider(props, { styles }) {
	const [sliderValues,setSliderValues] = useState([20,50]);

	return (
		<Stack direction="horizontal" gap={3} className={`amount ${styles}`} >
			<Form.Control
				type="text"
				className="amount"
				onChange={(e) => { props.handleChange(e); setSliderValues(e) }}
				value={`$${sliderValues[0]} `}
			/>
			<Slider
				range
				min={0}
				max={100}
				pushable={15}
				id={'slide'}
				defaultValue={sliderValues}
				onChange={(e) => { props.handleChange(e); setSliderValues(e) }}
			/>
			<Form.Control
				type="text"
				className="amount"
				onChange={(e) => { props.handleChange(e); setSliderValues(e) }}
				value={`$${sliderValues[1]} `}
			/>
		</Stack>
	);
}