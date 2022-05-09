import React, { Fragment, useState } from 'react';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export default function SelectTickets({ status }) {
	const [
		value,
		setValue
	] = useState();

	const handleChange = (val) => setValue(val);

	return (
		<Fragment>
			<h6 className="modal-heading-title mb-4">Select tickets to {status}</h6>
			<Stack direction="horizontal" className="split-row">
				<div>
					<span className="small fw-medium">General Admission</span>
				</div>
				<div>
					<span className="num-tickets">4 Tickets</span>
				</div>
			</Stack>
			<Form className="d-flex gap-4 pt-2">
				<ToggleButtonGroup type="checkbox" onChange={handleChange}>
					<ToggleButton id="tbg-btn-1" value={1}>
						GA
					</ToggleButton>
					<ToggleButton id="tbg-btn-2" value={2}>
						GA
					</ToggleButton>
					<ToggleButton id="tbg-btn-3" value={3}>
						GA
					</ToggleButton>
				</ToggleButtonGroup>
			</Form>
		</Fragment>
	);
}
