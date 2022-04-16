import React, { Fragment, useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { PriceRangeSlider } from './PriceRangeSlider';
import { FilterModal } from './FilterModal';
import { MySeats } from './MySeats';
import { TicketPurchaseFooter } from '../TicketPurchaseFooter';
import { NotAvailableMessage } from './NotAvailableMessage';
import TicketContext
 from '../../../../context/Ticket/Ticket';
import './seatSelection.scss';

export default function SeatSelection({ handleClick, type, isZoomed }) {
	const [
		numTickets,
		setNumTickets
	] = useState('2');

	const [
		ticketFilters,
		setTicketFilters
	] = useState([]);

	const [
		sliderValues,
		setSliderValues
	] = useState([
		20,
		50
	]);

	const [
		showFilter,
		setShowFilter
	] = useState(false);

	const tickets = useContext(TicketContext)

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
			seat: 'Sec Row',
			type: 'Presale'
		},
		{
			seat: 'Sec Row',
			type: 'Presale'
		},
		{
			seat: 'Sec Row',
			type: 'Presale'
		}
	];

	const ticketTypes = (ticket) => {
		if (!ticket.resale && ticket.on_sale_status === "available") return "Ticket"
		if (!ticket.resale && ticket.on_sale_status === "presale") return "Presale"
		if (ticket.resale && ticket.on_sale_status === "available") return "Resale Ticket"
	}

	return (
		<Fragment>
			{tickets && tickets.length > 0 ? (
				<Fragment>
					<header>
						<Stack direction="horizontal" gap={2} className="option-btns">
							<Form.Select
								id="form-select--numTickets"
								aria-label="Number of Tickets"
								value={numTickets}
								onChange={(e) => setNumTickets(e.target.value)}>
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
						<PriceRangeSlider
							styles="tablet-desktop-only"
							sliderValues={sliderValues}
							setSliderValues={setSliderValues}
						/>
					</header>
					<Stack direction="vertical" className="position-relative">
						{showFilter && <FilterModal show={showFilter} setShow={setShowFilter} />}
						{isZoomed && (
							<Stack direction="horizontal" className="heading--flex mb-3">
								<h3 className="text-uppercase">Your Tickets (7)</h3>
								<Button variant="link" className="text-danger">
									Remove all
								</Button>
							</Stack>
						)}
						<div className="seats-container">
							<div className="seats--scrollable">
								{!isZoomed && (
									<ListGroup as="ul">
										{ tickets &&
											tickets.map((ticket, index) => (
											<ListGroup.Item
												onClick={() => handleClick('confirmation')}
												action
												as="li"
												className="d-flex justify-content-between align-items-center"
												key={index}>
												<div>
													<div>
														<span className="fw-bold p-0">
															{ticket.attributes.generalAdmission ? 'General Admission' : 'Seated'}
														</span>
													</div>
													<div>
														<span className="text-muted caption">
															{ticketTypes(ticket.attributes)}
														</span>
													</div>
												</div>
												<div className="text-end">
													<div>
														<span className="fw-bold text-end">
															${parseFloat((ticket.attributes.royalty / 100) + ticket?.attributes?.cost + ticket?.attributes?.fee).toFixed(2)}
														</span>
													</div>
													<div>
														<span className="text-muted caption">
															${parseFloat(ticket?.attributes?.cost).toFixed(2)} + Fees
														</span>
													</div>
												</div>
											</ListGroup.Item>
										))}
									</ListGroup>
								)}
								{isZoomed && <MySeats />}
							</div>
						</div>
						{isZoomed &&
						!showFilter && (
							<TicketPurchaseFooter>
								<Link to={'/checkout/1'} className="btn w-100 btn-primary btn-lg">
									Checkout
								</Link>
							</TicketPurchaseFooter>
						)}
					</Stack>
				</Fragment>
			) : (
				<NotAvailableMessage>
					<h1 className="fs-md">Sorry, tickets are sold out.</h1>
					<p>Please check back anytime later to see if new tickets appear</p>
				</NotAvailableMessage>
			)}
		</Fragment>
	);
}
