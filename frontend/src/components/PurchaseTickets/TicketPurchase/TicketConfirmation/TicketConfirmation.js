import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import { TicketPurchaseFooter } from '../TicketPurchaseFooter';
import { BackButton } from '../../../BackButton';

import './ticketConfirmation.scss';

export default function TicketConfirmation({ handleGoBack, type, ticket }) {

	let [ticketCount, setTicketCount] = useState(1);
	
	let [prices, setPrices] = useState({
		sum: (parseFloat(ticket.attributes.cost + ticket.attributes.fee + ticket.attributes.facilityFee).toFixed(2) * ticketCount + 2.50 + 4.35).toFixed(2),
	})
	
	useEffect(() => {
		setPrices({
			sum: (parseFloat(ticket.attributes.cost + ticket.attributes.fee + ticket.attributes.facilityFee).toFixed(2) * ticketCount + 2.50 + 4.35).toFixed(2),
		})

		let data = {
			ticket,
			ticketCount
		}

		sessionStorage.setItem('cart', JSON.stringify(data))
	}, [ticketCount])
	return (
		<Fragment>
			<header>
				<BackButton handleGoBack={handleGoBack} marginBottom="3" />
			</header>
			<div className="ticket-details d-flex flex-column">
				<h1 className="normal--uppercase">Section general admission</h1>
				{!type && (
					<div className="seat caption text-muted fw-bold d-flex justify-content-between align-items-center">
						<div>
							<img
								src="https://mapsapi.tmol.io/maps/geometry/3/event/10005897A7611E7F/image?systemId=HOST&sectionNames=318&placeId=GMYTQORWHIZDI&sectionLevel=true&w=280&pw=30&app=CCP&pt=circle"
								alt=""
								width="173"
								height="111"
							/>
						</div>
						<div className="text-end">
							<div>
								<span>
									<span className="caption--uppercase">Upper Level</span> &bull;
									Sec B
								</span>
							</div>
							<div>Seats 419-420, Row 2</div>
						</div>
					</div>
				)}
			</div>
			<div className="disclaimer text-muted">
				<h2 className="caption fw-bold">Event Ticket limit: { ticket.attributes.maximum_quantity }</h2>
				<p className="m-0 caption">
					*As official local health guidelines evolve regarding COVID-19 safety protocols,
					select venues may shift seating configurations and/or increase capacity.
				</p>
			</div>

			<div className="ticket-counter">
				<h2 className="caption--uppercase text-muted mb-3">Number of Tickets</h2>
				<Stack direction="horizontal" className="justify-content-between">
					<div className="flex-grow-1">
						<p className="caption">General Admissions</p>
						<p className="fw-bold">
							${ prices?.sum } {' '}
							<span className="caption fw-normal text-muted">${ticket.attributes.cost.toFixed(2)} ea + Fees</span>
						</p>
					</div>
					<Stack direction="horizontal" className="counter fw-bolder">
						<Button title="decrease quantity of tickets" className="btn--icon" variant="outline-light" onClick={() => setTicketCount(ticketCount - 1)} disabled={ticketCount === ticket.attributes.minimum_quantity}
						aria-disabled={ticketCount === ticket.attributes.minimum_quantity} >
							<svg role="img" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M6.875 12C6.875 11.4477 7.32272 11 7.875 11H17.875C18.4273 11 18.875 11.4477 18.875 12C18.875 12.5523 18.4273 13 17.875 13H7.875C7.32272 13 6.875 12.5523 6.875 12Z" fill="#777E91"/>
</svg>
						</Button> 
						<span className='flex-grow-1 text-center'>{ ticketCount }</span>
						<Button title="increase quantity of tickets" className="btn--icon ms-0" variant="outline-light" onClick={() => setTicketCount(ticketCount + 1)} disabled={ticketCount >= ticket.attributes.maximum_quantity}
						aria-disabled={ticketCount >= ticket.attributes.maximum_quantity} >
							<svg role="img" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M13.95 7C13.95 6.44772 13.5022 6 12.95 6C12.3977 6 11.95 6.44772 11.95 7V11H7.94995C7.39767 11 6.94995 11.4477 6.94995 12C6.94995 12.5523 7.39767 13 7.94995 13H11.95V17C11.95 17.5523 12.3977 18 12.95 18C13.5022 18 13.95 17.5523 13.95 17V13H17.95C18.5022 13 18.95 12.5523 18.95 12C18.95 11.4477 18.5022 11 17.95 11H13.95V7Z" fill="#777E91"/>
</svg>

						</Button>
					</Stack>
				</Stack>
			</div>
			<TicketPurchaseFooter>
				<Link to={'/checkout/1'} className="btn w-100 btn-primary btn-lg">
					Checkout
				</Link>
			</TicketPurchaseFooter>
		</Fragment>
	);
}
