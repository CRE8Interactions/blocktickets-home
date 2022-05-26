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

export default function TicketSelection({ handleClick, setIsFilterOpen, isFilterOpen, type, isZoomed, setTicketCount, ticketCount }) {

	const tickets = useContext(TicketContext);

	// all tickets costs and ticket count combined for filtering 
	let totalTicketCount = 0;

	const [
		ticketFilters,
		setTicketFilters
	] = useState([]);

    // all tickets costs and ticket count combined for filtering 
    const [totalCost, setTotalCost] = useState(60)

	const [
		sliderValues,
		setSliderValues
	] = useState([20, totalCost]);

	const [
		showFilter,
		setShowFilter
	] = useState(false);

	const [
		filteredTicketCount,
		setFilteredTicketCount
	] = useState(1);

	const [
		gaTicketsAvailable,
		setGaTicketsAvailable
	] = useState(0)

	const [
		gaTicket,
		setGaTicket
	] = useState({})

	const [
		resaleTickets,
		setResaleTickets
	] = useState({})

	useEffect(() => {
		setGaTicketsAvailable(tickets?.generalAdmissionCount)
		setGaTicket(tickets?.generalAdmissionTicket)
		setResaleTickets(tickets?.reSaleTickets)
        getTotalCost();
		setSliderValues([20, totalCost])
	}, [tickets]); 

	useEffect(
		() => {
			// demo purposes - tickets with filters applied
			if (sliderValues[1] < totalCost || ticketCount > genAdmissionTickets.map(ticket => totalTicketCount += ticket.attributes?.maximum_quantity)) {
				setFilteredTicketCount(0);
			}

			return () => {
				setFilteredTicketCount(1);
			};
		},
		[
			sliderValues, ticketCount 
		]
	);

    // const getTotalCost = () => {
    //     setTotalCost(resaleTickets && resaleTickets.map(ticket => totalCost += ticket.attributes?.cost) + gaTicket.attributes?.cost)
    // }

	const handleShow = () => {
		setShowFilter(!showFilter); 
		setIsFilterOpen(!isFilterOpen)
	}

	// for demo purposes, this will come from the database
	 const genAdmissionTickets = [
		{
			id: 5277, 
			attributes: {
				cost: 20,
createdAt: "2022-05-03T17:17:01.471Z",
description: null,
eventId: "50",
facilityFee: 3,
fee: 5,
free: false,
generalAdmission: true,
listingAskingPrice: 34,
listingId: "19",
maximum_quantity: 4,
minimum_quantity: 1,
name: "General Admission",
on_sale_status: "resaleAvailable",
resale: true,
row: null,
royalty: 10
			}
		}
	];

	const handleNext = (ticket) => {
		if (!ticket.resale && ticket.on_sale_status === 'presaleAvailable') {
			handleClick('presale', ticket)
		} else {
			handleClick('confirmation', ticket)
		}
	}

	return (
		<Fragment>
			{gaTicketsAvailable && gaTicketsAvailable >= 1 ? ( 
				<Fragment>
			<header>
						<Stack direction="horizontal" gap={2} className="option-btns">
							<Form.Select
								aria-label="Number of Tickets"
								value={ticketCount}
								onChange={(e) => setTicketCount(parseInt(e.target.value))}>
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
											<Ticket ticket={gaTicket} handleNext={handleNext} />
											{
												resaleTickets && resaleTickets.map((ticket, index) => <Ticket ticket={ticket} key={index} handleNext={handleNext} />)
											}
										</ListGroup>	
									) : (
										<MyTickets />
									)}
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
