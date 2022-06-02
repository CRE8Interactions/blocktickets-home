import React from 'react';
import Slider from 'rc-slider';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

import 'rc-slider/assets/index.css';

import './priceRangeSlider.scss';

export default function PriceRangeSlider({ styles, sliderValues, setSliderValues }) {

	const handleChange = (sliderValues) => {
		setSliderValues(sliderValues);
	};

	return (
		<Stack direction="horizontal" gap={3} className={`amount ${styles}`}>
			<Form.Control
				type="text"
				className="form-control-xs"
				onChange={handleChange}
				value={`$${sliderValues[0]} `}
			/>
			<Slider
				range
				min={0}
				max={100}
				pushable={20}
				defaultValue={sliderValues}
				onChange={handleChange}
			/>
			<Form.Control
				type="text"
				className="form-control-xs"
				onChange={handleChange}
				value={`$${sliderValues[1]} `}
			/>
		</Stack>
	);
}
