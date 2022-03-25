import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

// import info from '../../../assets/icons/info.svg';
import './merchCard.scss';

export default function MerchCard() {
	return (
		<div className="card-content">
			<Row>
				<Col xs={5}>
					<img src="" alt="" />
				</Col>
				<Col>
					<Stack direction="vertical">
						<Card.Text className="title">
							Black T-Shirt with graphic and Tour dates
						</Card.Text>
						<Card.Text>Quantity limited to only 1 per person</Card.Text>
					</Stack>
				</Col>
			</Row>
		</div>
	);
}
