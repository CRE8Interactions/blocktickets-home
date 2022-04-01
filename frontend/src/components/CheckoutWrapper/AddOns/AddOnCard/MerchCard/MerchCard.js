import React from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

export default function MerchCard() {
	return (
		<div className="card-content">
			<Row>
				<Col xs={3}>
					<img src="" alt="" className="rounded-corners" />
				</Col>
				<Col>
					<Stack direction="vertical">
						<Card.Text className="title">
							Black T-Shirt with graphic and Tour dates
						</Card.Text>
						<Card.Text>Quantity limited to only 1 per person</Card.Text>
						<div className="mt-auto">
							<Card.Text>Size: L</Card.Text>
						</div>
					</Stack>
				</Col>
			</Row>
		</div>
	);
}
