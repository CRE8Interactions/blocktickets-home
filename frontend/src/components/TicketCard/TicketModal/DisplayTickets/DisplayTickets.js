import React, { Fragment, useState } from 'react';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export default function DisplayTickets({ role, status, setSelectedTickets }) {
	const handleChange = (val) => setSelectedTickets(val);

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
					<span className="num-tickets">4 Tickets</span>
				</div>
			</Stack>
			{role === 'select' ? (
				<Form className="d-flex mb-4">
					<ToggleButtonGroup
						type="checkbox"
						onChange={handleChange}
						className="flex-wrap">
						<ToggleButton id="tbg-btn-1" value={1}>
							GA
						</ToggleButton>
						<ToggleButton id="tbg-btn-2" value={2}>
							GA
						</ToggleButton>
						<ToggleButton id="tbg-btn-3" value={3}>
							GA
						</ToggleButton>
						<ToggleButton id="tbg-btn-4" value={4}>
							GA
						</ToggleButton>
						<ToggleButton id="tbg-btn-5" value={5}>
							GA
						</ToggleButton>
						<ToggleButton id="tbg-btn-6" value={6}>
							GA
						</ToggleButton>
						<ToggleButton id="tbg-btn-7" value={7}>
							GA
						</ToggleButton>
					</ToggleButtonGroup>
				</Form>
			) : (
				<Stack direction="horizontal" className="btn-group flex-wrap">
					<div className="btn btn-primary ticket-pick">GA</div>
					<div className="btn btn-primary ticket-pick">GA</div>
					<div className="btn btn-primary ticket-pick">GA</div>
				</Stack>
			)}
		</Fragment>
	);
}
