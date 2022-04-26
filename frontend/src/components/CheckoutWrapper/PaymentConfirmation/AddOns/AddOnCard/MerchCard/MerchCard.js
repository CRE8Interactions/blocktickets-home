import React from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

export default function MerchCard() {
	return (
		<Row>
			<Col xs={3}>
				<img className="br-sm" src="" alt="" />
			</Col>
			<Col>
				<Stack>
					<p className="title">Black T-Shirt with graphic and Tour dates</p>
					<p>Quantity limited to only 1 per person</p>
					<div className="mt-auto">
						<p className="size">Size: L</p>
					</div>
				</Stack>
			</Col>
			<Col>
				<Stack className="btn-group-flex">
					<Button variant="outline-light">Shipping</Button>
				</Stack>
			</Col>
		</Row>
	);
}
