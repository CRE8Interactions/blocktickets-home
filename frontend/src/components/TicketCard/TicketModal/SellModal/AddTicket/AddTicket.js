import React, { useEffect, useState } from 'react';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';

export default function AddTicket({ tickets, selectedTickets, setSelectedTickets }) {
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
			<Stack direction="horizontal" gap={3} className="align-items-center">
				<Form.Label className="selected-label">Selected ticket</Form.Label>

				<Form.Select
					onChange={(e) => {
						handleChange(e);
					}}>
					<option>Select</option>
					{filteredOptions.map((option) => <option key={option}>{option} </option>)}
				</Form.Select>

				<CloseButton />
			</Stack>
		</Form.Group>
	);
}
