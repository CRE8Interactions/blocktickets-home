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
	console.log(sliderValues)
	return (
		<Stack direction="horizontal" gap={3} className={`amount ${styles}`}>
			<Form.Control
				type="text"
				className="form-control-xs"
				onChange={handleChange}
				value={`$${sliderValues[0]} `}
				disabled={true}
			/>
			<Slider
				range
				min={sliderValues[0]}
				step={10}
				max={sliderValues[1] + 1}
				pushable={20}
				defaultValue={sliderValues}
				onChange={handleChange}
			/>
			<Form.Control
				type="text"
				className="form-control-xs"
				onChange={handleChange}
				value={`$${sliderValues[1]} `}
				disabled={true}
			/>
		</Stack>
	);
}
