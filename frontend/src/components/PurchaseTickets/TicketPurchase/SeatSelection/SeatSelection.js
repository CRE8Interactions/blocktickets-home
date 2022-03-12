import React, { Fragment, useState } from 'react';
import Slider from 'rc-slider';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import 'rc-slider/assets/index.css';
import './seatSelection.scss';

export default function SeatSelection({ handleClick }) {
	const [
		sliderValues,
		setSliderValues
	] = useState([
		20,
		50
	]);

	const handleChange = (sliderValues) => {
		setSliderValues(sliderValues);
	};

	return (
		<Fragment>
			<div className="seat-selection">
				<Form>
					<Stack direction="horizontal" gap={3}>
						<Form.Select aria-label="Number of Tickets">
							<option value="1">1 Ticket</option>
							<option value="2" selected>
								2 Tickets
							</option>
							<option value="3">3 Tickets</option>
						</Form.Select>

						<Button className="btn--filter" variant="outline-light">
							Filter
						</Button>
					</Stack>
					<Stack direction="horizontal" gap={3} className="amount">
						<Form.Control
							type="text"
							className="amount"
							value={`$${sliderValues[0]} `}
						/>
						<Slider
							range
							min={0}
							max={100}
							pushable={15}
							defaultValue={sliderValues}
							onChange={handleChange}
						/>
						<Form.Control
							type="text"
							className="amount"
							value={`$${sliderValues[1]} `}
						/>
					</Stack>

					<ListGroup as="ul" variant="flush">
						<ListGroup.Item
							action
							as="li"
							className="d-flex justify-content-between align-items-center">
							<div>
								<Form.Check
									type="radio"
									label="Standard Admission"
									aria-label="Standard Admission"
									name="standard"
									id="1"
									className="caption fw-bold p-0"
								/>
								<p className="text-muted caption">Presale</p>
							</div>
							<div className="fw-bold">$30.00</div>
						</ListGroup.Item>
						<ListGroup.Item
							onClick={() => handleClick('standard')}
							as="li"
							action
							className="d-flex justify-content-between align-items-center">
							<div>
								<Form.Check
									type="radio"
									label="Sec Row"
									aria-label="Sec Row"
									name="standard"
									id="2"
									className="caption fw-bold p-0"
								/>
								<p className="text-muted caption">Standard Admission</p>
							</div>
							<div className="fw-bold">$30.00</div>
						</ListGroup.Item>
						<ListGroup.Item
							action
							as="li"
							className="d-flex justify-content-between align-items-center">
							<div>
								<Form.Check
									type="radio"
									label="Section B &bull; Row 2"
									aria-label="Section B Row 2"
									name="standard"
									id="1"
									className="caption fw-bold p-0"
								/>
								<p className="text-muted caption">Resale Ticket</p>
							</div>
							<div className="fw-bold">$30.00</div>
						</ListGroup.Item>
					</ListGroup>
				</Form>
			</div>
		</Fragment>
	);
}
