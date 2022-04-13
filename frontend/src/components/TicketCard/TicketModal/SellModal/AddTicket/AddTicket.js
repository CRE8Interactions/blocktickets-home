import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function AddTicket() {
	return (
		<Form.Group controlId="ticket" className="form-group">
			<Row className="split-row">
				<Col>
					<Form.Label className="selected-label">Selected ticket</Form.Label>
				</Col>
				<Col>
					<Form.Select>
						<option>Select</option>
					</Form.Select>
				</Col>
			</Row>
		</Form.Group>
	);
}
