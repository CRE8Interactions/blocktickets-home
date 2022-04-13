import React, { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function AddTicket({ selectedTickets, setSelectedTickets }) {
	// for demo purposes, will come from database
	const tickets = [
		'Nicfanciulli#9358',
		'Another#1234',
		'Nicfanciulli#9358',
		'third#9358'
	];

	const [
		filteredOptions,
		setFilteredOptions
	] = useState([]);

	// remove options if already added
	const getOptions = (selectedTickets, tickets) => {
		const ticketsSelected = Object.values(selectedTickets);
		const filteredOptions = tickets.filter((ticket) => {
			if (ticketsSelected.includes(ticket)) {
				return;
			}
			else {
				return tickets.indexOf(ticket);
			}
		});

		console.log(filteredOptions);
		return filteredOptions;
	};

	useEffect(() => {
		setFilteredOptions(getOptions(selectedTickets, tickets));
	}, []);

	const handleChange = (e) => {
		// get the number of tickets already
		let numTickets = Object.keys(selectedTickets).length;
		// get new add ticket num
		const addTicketNum = ++numTickets;
		setSelectedTickets({
			...selectedTickets,
			[addTicketNum]: e.target.value
		});
	};
	return (
		<Form.Group controlId="ticket" className="form-group">
			<Row className="split-row">
				<Col>
					<Form.Label className="selected-label">Selected ticket</Form.Label>
				</Col>
				<Col>
					<Form.Select
						onChange={(e) => {
							handleChange(e);
						}}>
						<option>Select</option>
						{filteredOptions.map((option) => <option key={option}>{option} </option>)}
					</Form.Select>
				</Col>
			</Row>
		</Form.Group>
	);
}
