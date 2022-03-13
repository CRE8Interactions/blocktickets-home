import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import plus from '../../../../assets/icons/plus.svg';
import minus from '../../../../assets/icons/minus.svg';
import shoppingCart from '../../../../assets/icons/shopping-cart-black.svg';

import './seatConfirmation.scss';

import { BackButton } from './../../../BackButton';

export default function SeatConfirmation() {
	return (
		<Fragment>
			<div className="seat-confirmation">
				<header className="d-flex flex-column">
					<BackButton />
				</header>
				<div className="ticket-details d-flex flex-column">
					<h1 className="text-uppercase">Section general admission</h1>
				</div>
				<div className="disclaimer text-muted">
					<h2 className="caption--uppercase">Event Ticket limit: 8</h2>
					<p className="caption">
						*As official local health guidelines evolve regarding COVID-19 safety
						protocols, select venues may shift seating configurations and/or increase
						capacity.
					</p>
				</div>

				<div className="num-tickets">
					<h2 className="caption--uppercase text-muted mb-3">Number of Tickets</h2>
					<Stack direction="horizontal" className="justify-content-between">
						<div>
							<p className="caption">General Admissions</p>
							<p className="fw-bold">
								$30{' '}
								<span className="caption fw-light text-muted">$24 ea + Fees</span>
							</p>
						</div>
						<div className=" fw-bolder">
							<Button className="btn--icon me-3" variant="outline-light">
								<img src={minus} />
							</Button>2
							<Button className="btn--icon" variant="outline-light">
								<img src={plus} />
							</Button>
						</div>
					</Stack>
				</div>
				<Row className="align-items-center footer">
					<Col xs={3}>
						<Link to={'/'} className=" btn btn--icon-lg btn-outline-light me-3">
							<img src={shoppingCart} />
						</Link>
						<span className="caption text-muted">or</span>
					</Col>
					<Col>
						<Link to={'/checkout'} className="btn mt-0 w-100 btn-secondary btn-lg">
							Checkout
						</Link>
					</Col>
				</Row>
			</div>
		</Fragment>
	);
}
