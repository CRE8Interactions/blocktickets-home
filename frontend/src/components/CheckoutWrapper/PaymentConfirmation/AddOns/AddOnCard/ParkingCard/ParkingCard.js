import React from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import './parkingCard.scss';

export default function ParkingCard() {
	return (
		<Row>
			<Col xs={3}>
				<img src="" alt="" className="rounded-corners" />
			</Col>
			<Col>
				<Stack direction="vertical">
					<p className="title">330 E. Jefferson St. George</p>
					<div className="parking-directions">
						<p>
							<span>0.2 Miles away</span>
							<span>Self Park, Attended</span>
						</p>
					</div>
					<div className="powered-by">
						<p>
							Powered by <span className="sponsor">Parkwhiz</span>
						</p>
					</div>
				</Stack>
			</Col>
			<Col>
				<Stack className="btn-group-flex" gap={3}>
					<Button variant="outline-light">Parking Ticket</Button>
					<Button variant="outline-light">Directions</Button>
				</Stack>
			</Col>
		</Row>
	);
}
