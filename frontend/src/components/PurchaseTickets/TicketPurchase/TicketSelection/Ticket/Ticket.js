import React from 'react';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

// import './ticket.scss';

export default function Ticket({ attributes } = data) {
	return (
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
	);
}
