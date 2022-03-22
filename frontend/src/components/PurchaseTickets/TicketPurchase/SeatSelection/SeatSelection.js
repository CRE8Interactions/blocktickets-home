import React, { Fragment, useState, useEffect } from 'react';
import { PriceRangeSlider } from './PriceRangeSlider';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import './seatSelection.scss';
import { FilterModal } from './FilterModal';

export default function SeatSelection({ handleClick, type }) {
	const [
		selected,
		setSelected
	] = useState('2');

	const [
		showFilter,
		setShowFilter
	] = useState(false);

	// for demo purposes, this will come from the database
	const genAdmissionTickets = [
		{
			seat: 'General Admissions',
			type: 'Ticket'
		},
		{
			seat: 'General Admissions',
			type: 'Resale Ticket'
		},
		{
			seat: 'General Admissions',
			type: 'Resale Ticket'
		},
		{
			seat: 'General Admissions',
			type: 'Resale Ticket'
		},
		{
			seat: 'General Admissions',
			type: 'Resale Ticket'
		},
		{
			seat: 'General Admissions',
			type: 'Resale Ticket'
		},
		{
			seat: 'General Admissions',
			type: 'Resale Ticket'
		},
		{
			seat: 'General Admissions',
			type: 'Resale Ticket'
		},
		{
			seat: 'General Admissions',
			type: 'Resale Ticket'
		}
	];

	const seatedTickets = [
		{
			seat: 'Sec Row',
			type: 'Presale'
		},
		{
			seat: 'Section B &bull; Row 2',
			type: 'Standard Ticket'
		}
	];

	let tickets;
	{
		tickets = type == 'genAdmissions' ? genAdmissionTickets : seatedTickets;
	}

	return (
		<Fragment>
			<div className="seat-selection">
				<Stack direction="horizontal" gap={2} className="option-btns">
					<Form.Select
						aria-label="Number of Tickets"
						value={selected}
						onChange={(e) => setSelected(e.target.value)}>
						<option value="1">1 Ticket</option>
						<option value="2">2 Tickets</option>
						<option value="3">3 Tickets</option>
					</Form.Select>

					<Button
						className="btn--filter"
						variant="outline-light"
						onClick={() => setShowFilter(!showFilter)}>
						Filter
					</Button>
				</Stack>

				<PriceRangeSlider styles="tablet-desktop-only" />

				<div className="seats">
					{<FilterModal show={showFilter} setShow={setShowFilter} />}
					<ListGroup as="ul">
						{tickets.map((ticket) => (
							<ListGroup.Item
								onClick={() => handleClick('quantity')}
								action
								as="li"
								className="d-flex justify-content-between align-items-center">
								<div>
									<div>
										<span className="fw-bold p-0">{ticket.seat}</span>
									</div>
									<div>
										<span className="text-muted caption">{ticket.type}</span>
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
						))}
					</ListGroup>
				</div>
			</div>
		</Fragment>
	);
}
