import React, { Fragment } from 'react';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export default function DisplayTickets({ role, status, setSelectedTickets, tickets, selectedTickets }) {
	const handleChange = (val) => setSelectedTickets(val);

	tickets ? tickets = tickets.filter(ticket => ticket.on_sale_status !== "pendingTransfer") : ''

	return (
		<Fragment>
			{role === 'select' && (
				<h6 className="modal-heading-title mb-4">Select tickets to {status}</h6>
			)}
			<Stack direction="horizontal" className="split-row">
				<div>
					<span className="small fw-medium">General Admission</span>
				</div>
				<div>
					<span className="num-tickets">{tickets ? tickets?.length : selectedTickets?.length} Tickets</span>
				</div>
			</Stack>
			{role === 'select' ? (
				<Form className="d-flex mb-4">
					<ToggleButtonGroup
						type="checkbox"
						onChange={handleChange}
						className="flex-wrap">
							{
								tickets && tickets.map((ticket, index) => {
									return (<ToggleButton id={`tbg-btn-${index}`} value={ticket} key={index}>
														GA
													</ToggleButton>
									)
								})
							}
					</ToggleButtonGroup>
				</Form>
			) : (
				<Stack direction="horizontal" className="btn-group flex-wrap">
					{ selectedTickets && selectedTickets.map((ticket, index) => {
						return(
							<div className="btn btn-primary ticket-pick" key={index}>GA</div>
						)
					})}
					
				</Stack>
			)}
		</Fragment>
	);
}
