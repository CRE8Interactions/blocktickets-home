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
	// console.log(tickets)
	// all tickets costs and ticket count combined for filtering 
	let totalCosts = 0; 
	let totalTicketCount = 0;

	const [
		ticketFilters,
		setTicketFilters
	] = useState({ showFees: false, standard: true, resale: true });

	const [
		sliderValues,
		setSliderValues
	] = useState([0, 0]);

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
		setGaTicket(tickets?.generalAdmissionTicket);
    setResaleTickets(tickets?.reSaleTickets)
		if (!tickets) return;
		let higestResalePrice = tickets.generalAdmissionTicket?.attributes?.cost
		if (tickets?.reSaleTickets && tickets?.reSaleTickets.length > 0) {
			let higestResalePrice = tickets?.reSaleTickets?.map(ticket => ticket?.attributes?.listingAskingPrice).reduce((a, b) => Math.max(a,b))
		}
		let higestPrice = tickets?.reSaleTickets && tickets?.reSaleTickets?.length > 0 ? higestResalePrice : tickets.generalAdmissionTicket?.attributes?.cost;
		let lowestPrice = tickets.generalAdmissionTicket?.attributes?.cost;
		setSliderValues([lowestPrice, higestPrice])
	}, [tickets]); 

	useEffect(
		() => {
			// if no ticket type is selected, display filter message 
			if ((tickets?.generalAdmissionTicket && !ticketFilters.standard) || (tickets?.reSaleTickets && tickets?.reSaleTickets.length > 0 && !ticketFilters.resale)) {
				setFilteredTicketCount(0);
			}

			return () => {
				setFilteredTicketCount(1);
			};
		},
		[
			sliderValues, ticketCount, ticketFilters 
		]
	);

	const handleShow = () => {
		setShowFilter(!showFilter); 
		setIsFilterOpen(!isFilterOpen)
	}

	const selectOptions = () => {
		let options = [];
		for (let i = 1; i <= tickets?.generalAdmissionTicket?.attributes?.maximum_quantity; i++) {
			options.push({key: i, value: i, name: i === 1 ? `${i} Ticket` : `${i} Tickets`})
		}
		return options;
	}

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
								{ selectOptions().map((o, index) => {
									return <option value={o.key} key={o.key}>{o.name}</option>
								})}
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
								<FilterMenu show={showFilter} handleShow={handleShow} sliderValues={sliderValues} setSliderValues={setSliderValues} ticketFilters={ticketFilters} setTicketFilters={setTicketFilters} />
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
											{ticketFilters.standard && (<Ticket ticket={gaTicket} handleNext={handleNext} ticketFilters={ticketFilters} /> )}
                                            
                                            {ticketFilters.resale && ( 
                                                <>
												{resaleTickets && resaleTickets.map((ticket, index) => <Ticket ticket={ticket} key={index} handleNext={handleNext} ticketFilters={ticketFilters} />)
											} 
                                            </>
                                            )}
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