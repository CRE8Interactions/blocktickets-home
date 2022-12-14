import React, { Fragment } from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import './parkingCard.scss';

export default function ParkingCard() {
	return (
		<div className="card-content">
			<Row>
				<Col xs={3}>
					<img src="" alt="" className="br-sm" />
				</Col>
				<Col>
					<Stack direction="vertical">
						<Card.Text className="title">330 E. Jefferson St. George</Card.Text>
						<div className="parking-directions">
							<Card.Text>
								<span>0.2 Miles away</span>
								<span>Self Park, Attended</span>
							</Card.Text>
						</div>
						<div className="powered-by">
							<Card.Text>
								Powered by <span className="sponsor">Parkwhiz</span>
							</Card.Text>
						</div>
					</Stack>
				</Col>
			</Row>
		</div>
	);
}
