import React, { Fragment } from 'react';
import { PriceRangeSlider } from './PriceRangeSlider';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import './seatSelection.scss';

export default function SeatSelection({ handleClick }) {
	return (
		<Fragment>
			<div className="seat-selection">
				<Stack direction="horizontal" gap={2} className="option-btns">
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
				<PriceRangeSlider />

				<ListGroup as="ul">
					<ListGroup.Item
						onClick={() => handleClick('presale')}
						action
						as="li"
						className="d-flex justify-content-between align-items-center">
						<div>
							<div>
								<span className="caption fw-bold p-0">Standard Admission</span>
							</div>
							<div>
								<span className="text-muted caption">Presale</span>
							</div>
						</div>
						<div className="text-end">
							<div>
								<span className="fw-bold text-end">$30.00</span>
							</div>
							<div>
								<span className="text-muted caption">$24.78 + Fees</span>
							</div>
						</div>
					</ListGroup.Item>
					<ListGroup.Item
						onClick={() => handleClick('quantity')}
						as="li"
						action
						className="d-flex justify-content-between align-items-center">
						<div>
							<div>
								<span className="caption fw-bold p-0">Sec Row</span>
							</div>
							<div>
								<span className="text-muted caption">Standard Admission</span>
							</div>
						</div>
						<div className="text-end">
							<div>
								<span className="fw-bold text-end">$30.00</span>
							</div>
							<div>
								<span className="text-muted caption">$24.78 + Fees</span>
							</div>
						</div>
					</ListGroup.Item>
					<ListGroup.Item
						onClick={() => handleClick('quantity')}
						action
						as="li"
						className="d-flex justify-content-between align-items-center">
						<div>
							<div>
								<span className="caption fw-bold p-0">Section B &bull; Row 2</span>
							</div>
							<div>
								<span className="text-muted caption">Resale Ticket</span>
							</div>
						</div>
						<div className="text-end">
							<div>
								<span className="fw-bold text-end">$30.00</span>
							</div>
							<div>
								<span className="text-muted caption">$24.78 + Fees</span>
							</div>
						</div>
					</ListGroup.Item>
				</ListGroup>
			</div>
		</Fragment>
	);
}
