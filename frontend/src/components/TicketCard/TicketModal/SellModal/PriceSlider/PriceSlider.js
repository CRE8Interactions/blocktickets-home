import React from 'react';
import Slider from 'rc-slider';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

import { formatNumber } from '../../../../../utilities/helpers';

import 'rc-slider/assets/index.css';

export default function PriceSlider({ sliderValue, setSliderValue }) {
	const handleChange = (sliderValue) => {
		setSliderValue(sliderValue);
	};

	return (
		<Stack direction="horizontal" gap={3}>
			<Form.Control type="text" className="form-control-xs" defaultValue={'$20.00'} />
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
