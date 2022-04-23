import React, { Fragment, useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

import TicketContext from '../../../../context/Ticket/Ticket';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { PriceRangeSlider } from './PriceRangeSlider';
import { FilterModal } from './FilterModal';
import { Ticket } from './Ticket';
import { MyTickets } from './MyTickets';
import { TicketPurchaseFooter } from '../TicketPurchaseFooter';
import { NotAvailableMessage } from './NotAvailableMessage';

import './ticketSelection.scss';

export default function TicketSelection({ handleClick, type, isZoomed }) {
	const [
		numTickets,
		setNumTickets
	] = useState(1);

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

	const tickets = useContext(TicketContext);

	const [
		filteredTicketCount,
		setFilteredTicketCount
	] = useState(1);

	useEffect(
		() => {
			// demo purposes - tickets with filters applied
			if (sliderValues[1] < tickets.generalAdmissionTicket?.attributes?.cost || numTickets > tickets.generalAdmissionTicket?.attributes?.maximum_quantity) {
				setFilteredTicketCount(0);
			}

			return () => {
				setFilteredTicketCount(1);
			};
		},
		[
			sliderValues, numTickets 
		]
	);

	// for demo purposes, this will come from the database
	// const genAdmissionTickets = [
	// 	{
	// 		seat: 'General Admissions',
	// 		type: 'Ticket'
	// 	},
	// 	{
	// 		seat: 'General Admissions',
	// 		type: 'Resale Ticket'
	// 	}
	// ];

	// const seatedTickets = [
	// 	{
	// 		seat: 'Sec Row',
	// 		type: 'Presale'
	// 	},
	// 	{
	// 		seat: 'Sec Row',
	// 		type: 'Presale'
	// 	},
	// 	{
	// 		seat: 'Sec Row',
	// 		type: 'Presale'
	// 	},
	// 	{
	// 		seat: 'Sec Row',
	// 		type: 'Presale'
	// 	}
	// ];

	const ticketTypes = (ticket) => {
		if (!ticket.resale && ticket.on_sale_status === 'available') return 'Ticket';
		if (!ticket.resale && ticket.on_sale_status === 'presale') return 'Presale';
		if (ticket.resale && ticket.on_sale_status === 'available') return 'Resale Ticket';
	};

	const handleNext = (ticketType) => {}

	return (
		<Fragment>
			{tickets && tickets.generalAdmissionTicket && tickets.generalAdmissionCount > 0 ? (
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
								<option value="4">4 Tickets</option>
								<option value="5">5 Tickets</option>
								<option value="6">6 Tickets</option>
								<option value="7">7 Tickets</option>
								<option value="8">8 Tickets</option>
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

					{filteredTicketCount > 0 ? (
						<Stack direction="vertical" className="position-relative">
							{showFilter && (
								<FilterModal show={showFilter} setShow={setShowFilter} />
							)}
							{isZoomed && (
								<Stack direction="horizontal" className="heading--flex mb-3">
									<h3 className="text-uppercase">Your Tickets (7)</h3>
									<Button variant="link" className="text-danger">
										Remove all
									</Button>
								</Stack>
							)}

							<div className="tickets-container">
								<div className="tickets--scrollable">
									{!isZoomed ? (
									
										<ListGroup as="ul">
										<ListGroup.Item
											onClick={() =>
												handleClick(
													'confirmation',
													tickets.generalAdmissionTicket
												)}
											action
											as="li"
											className="d-flex justify-content-between align-items-center">
											<div>
												<div>
													<span className="fw-bold p-0">
														{tickets.generalAdmissionTicket.attributes.generalAdmission ? 'General Admission' : 'Seated'}
													</span>
												</div>
												<div>
													<span className="text-muted caption">
														{ticketTypes(tickets.generalAdmissionTicket.attributes)}
													</span>
												</div>
											</div>
											<div className="text-end">
												<div>
													<span className="fw-bold text-end">
														${parseFloat(tickets.generalAdmissionTicket?.attributes?.cost + tickets.generalAdmissionTicket?.attributes?.fee + tickets.generalAdmissionTicket?.attributes?.facilityFee + 2.50 + 4.35).toFixed(2)}
													</span>
												</div>
												<div>
													<span className="text-muted caption">
														${parseFloat(tickets.generalAdmissionTicket?.attributes?.cost).toFixed(2)} + Fees
													</span>
												</div>
											</div>
										</ListGroup.Item>
										
											
										</ListGroup>
										
									) : (
										<MyTickets />
									
									)}
								</div>
							</div>
							{isZoomed &&
							!showFilter && (
								<TicketPurchaseFooter>
									<Link
										to={'/checkout/1'}
										className="btn w-100 btn-primary btn-lg">
										Checkout
									</Link>
								</TicketPurchaseFooter>
							)}
						</Stack>
					) : (
						<NotAvailableMessage>
							<h1 className="normal">Please adjust your search</h1>
							<p>
								The seating options you selected aren't available due to the ticket
								quantity or filter you applied. Please try adjusting the number of
								tickets selected or use the seat map to search for available seats.
							</p>
						</NotAvailableMessage>
					)}
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