import React from 'react';
import Slider from 'rc-slider';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

import { formatNumber } from './../../../../../utilities/helper';

import 'rc-slider/assets/index.css';

export default function PriceSlider({ sliderValue, setSliderValue }) {
	const handleChange = (sliderValue) => {
		setSliderValue(formatNumber(sliderValue));
	};

	return (
		<Stack direction="horizontal" gap={3}>
			<Form.Control
				type="text"
				className="form-control-xs"
				onChange={handleChange}
				value={`$${formatNumber(sliderValue)} `}
			/>
			<Slider
				step={0.01}
				min={10}
				max={999}
				defaultValue={formatNumber(sliderValue)}
				onChange={handleChange}
			/>
			<Form.Control type="text" className="form-control-xs" defaultValue={`$999.99+`} />
		</Stack>
	);
}
