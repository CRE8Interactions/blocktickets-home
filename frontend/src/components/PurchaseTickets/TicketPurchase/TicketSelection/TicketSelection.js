import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import TicketContext from '../../../../context/Ticket/Ticket';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { PriceRangeSlider } from './PriceRangeSlider';
import { FilterMenu } from './FilterMenu';
import { Ticket } from './Ticket';
import { MyTickets } from './MyTickets';
import { TicketPurchaseFooter } from '../TicketPurchaseFooter';
import { NotAvailableMessage } from './NotAvailableMessage';

import './ticketSelection.scss';

export default function TicketSelection({ handleClick, setIsFilterOpen, isFilterOpen, type, isZoomed }) {

	const tickets = useContext(TicketContext);

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
	] = useState([20, tickets.generalAdmissionTicket?.attributes?.cost]);

	const [
		showFilter,
		setShowFilter
	] = useState(false);

	const [
		filteredTicketCount,
		setFilteredTicketCount
	] = useState(1);

	useEffect(() => {
		setSliderValues([20, tickets.attributes?.cost])
	}, [tickets]); 

	useEffect(
		() => {
			// demo purposes - tickets with filters applied
			if (sliderValues[1] < tickets.attributes?.cost || numTickets > tickets.attributes?.maximum_quantity) {
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

	const handleShow = () => {
		setShowFilter(!showFilter); 
		setIsFilterOpen(!isFilterOpen)
	}

	// for demo purposes, this will come from the database
// 	 const genAdmissionTickets = [
// 		{
// 			id: 5277, 
// 			attributes: {
// 				cost: 20,
// createdAt: "2022-05-03T17:17:01.471Z",
// description: null,
// eventId: "50",
// facilityFee: 3,
// fee: 5,
// free: false,
// generalAdmission: true,
// listingAskingPrice: 34,
// listingId: "19",
// maximum_quantity: 4,
// minimum_quantity: 1,
// name: "General Admission",
// on_sale_status: "available",
// resale: false,
// row: null,
// royalty: 10
// 			}
// 		}
// 	];

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

	const handleNext = (ticket) => {
		if (!ticket.resale && ticket.on_sale_status === 'presaleAvailable') {
			handleClick('presale', ticket)
		} else {
			handleClick('confirmation', ticket)
		}
	}

	return (
		<Fragment>
			{tickets && Object.keys(tickets).length > 0 ? ( 
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
								onClick={handleShow}>
								Filter
							</Button>
						</Stack>
						<PriceRangeSlider
							styles="tablet-desktop-only"
							sliderValues={sliderValues}
							setSliderValues={setSliderValues}
						/>
					</header>
					<Stack direction="vertical">
					{showFilter && (
								<FilterMenu show={showFilter} handleShow={handleShow} sliderValues={sliderValues} setSliderValues={setSliderValues}  />
					)}
					{filteredTicketCount > 0 ? (
						<>
						{!isFilterOpen && (
							<>
							{isZoomed && (
								<Stack direction="horizontal" className="heading--flex mb-3">
									<h3 className="normal--uppercase">Your Tickets (7)</h3>
									<Button variant="link" className="text-danger">
										Remove all
									</Button>
								</Stack>
							)}
					<div className="tickets-container">
								<div className="tickets--scrollable">
									{!isZoomed ? (
										<ListGroup as="ul">
										{tickets.map((ticket, index) => (<Ticket key={index} ticket={ticket} handleNext={handleNext} />))}
										</ListGroup>	
									) : (
										<MyTickets />
									)}
									{
										// <ListGroup>
										// 	{
										// 		tickets && tickets.reSaleTickets && tickets.reSaleTickets.map((ticket, index) => {
										// 			return (<ListGroup.Item
										// 				onClick={() =>
										// 						handleClick(
										// 							'confirmation',
										// 							ticket
										// 						)}
										// 					action
										// 					as="li"
										// 					key={index}
										// 					className="d-flex justify-content-between align-items-center">
										// 					<div>
										// 						<div>
										// 							<span className="fw-bold p-0">
										// 							{ticket.attributes.generalAdmission ? 'General Admission' : 'Seated'}
										// 							</span>
										// 						</div>
										// 						<div>
										// 							<span className="text-muted caption">
										// 									{ticketTypes(ticket?.attributes)}  
										// 							</span>
										// 						</div>
										// 					</div>
										// 					<div className="text-end">
										// 						<div>
										// 							<span className="fw-bold text-end">
										// 									${parseFloat(ticket?.attributes?.listingAskingPrice + ticket?.attributes?.fee + ticket?.attributes?.facilityFee + 2.50 + 4.35).toFixed(2)} 
										// 							</span>
										// 						</div>
										// 						<div>
										// 							<span className="text-muted caption">
										// 								${parseFloat(ticket?.attributes?.listingAskingPrice).toFixed(2)} + Fees 
										// 							</span>
										// 						</div>
										// 					</div>
										// 			</ListGroup.Item>)
										// 		})
										// 	}
										// </ListGroup>
									}
								</div>
							</div>
							{isZoomed && (
								<TicketPurchaseFooter>
									<Link
										to={'/checkout/1'}
										className="btn w-100 btn-primary btn-lg">
										Checkout
									</Link>
								</TicketPurchaseFooter>
							)}
							</>
						)}
						</>
					) : (
						<>
						{!isFilterOpen && (
						<NotAvailableMessage>
							<h1 className="normal">Please adjust your search</h1>
							<p>
								The seating options you selected aren't available due to the ticket
								quantity or filter you applied. Please try adjusting the number of
								tickets selected or use the seat map to search for available seats.
							</p>
						</NotAvailableMessage>	
						)}
						</>
					)
					}
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
