import React, { useState } from 'react';
import Slider from 'rc-slider';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

import 'rc-slider/assets/index.css';

import './priceRangeSlider.scss';

export default function PriceRangeSlider({ styles, sliderValues, setSliderValues, originalValues }) {
	const [values, setValues] = useState()
	const handleChange = (sliderValues) => {
		setSliderValues(sliderValues);
	};

	return (
		<Stack direction="horizontal" gap={3} className={`amount ${styles}`}>
			{
				originalValues && originalValues[0] && originalValues[1] &&
				<>
					<Form.Control
						type="text"
						className="form-control-xs"
						onChange={handleChange}
						value={`$${sliderValues[0]} `}
						disabled={true}
					/>
					{ originalValues && originalValues[0] === originalValues[1] &&
						<Slider
							step={10}
							defaultValue={originalValues}
							min={originalValues[0]}
							max={originalValues[1]}
							onChange={handleChange}
							allowCross={false}
						/>
					}

					{ originalValues && originalValues[0] != originalValues[1] && 
						<Slider
							range
							step={10}
							defaultValue={originalValues}
							min={originalValues[0]}
							max={originalValues[1]}
							onChange={handleChange}
							allowCross={false}
						/>
					}

					
					<Form.Control
						type="text"
						className="form-control-xs"
						onChange={handleChange}
						value={`$${sliderValues[1]} `}
						disabled={true}
					/>
				</>
			}
		</Stack>
	);
}
