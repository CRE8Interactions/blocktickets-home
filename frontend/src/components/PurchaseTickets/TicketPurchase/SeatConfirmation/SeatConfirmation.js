import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import plus from '../../../../assets/icons/plus.svg';
import minus from '../../../../assets/icons/minus.svg';
import shoppingCart from '../../../../assets/icons/shopping-cart-black.svg';

import './seatConfirmation.scss';

import { BackButton } from './../../../BackButton';

export default function SeatConfirmation({ handleGoBack, type }) {
	return (
		<Fragment>
			<div className="seat-confirmation">
				<header className="d-flex flex-column">
					<BackButton handleGoBack={handleGoBack} />
				</header>
				<div className="ticket-details d-flex flex-column">
					<h1 className="text-uppercase">Section general admission</h1>
					{type !== 'genAdmission' && (
						<div className="seat caption text-muted fw-bold d-flex justify-content-between align-items-center">
							<div>
								<img
									src="https://mapsapi.tmol.io/maps/geometry/3/event/10005897A7611E7F/image?systemId=HOST&sectionNames=318&placeId=GMYTQORWHIZDI&sectionLevel=true&w=280&pw=30&app=CCP&pt=circle"
									alt=""
									width="173"
									height="111"
								/>
							</div>
							<div className="text-end">
								<div>
									<span>
										<span className="caption--uppercase">Upper Level</span>{' '}
										&bull; Sec B
									</span>
								</div>
								<div>Seats 419-420, Row 2</div>
							</div>
						</div>
					)}
				</div>
				<div className="disclaimer text-muted">
					<h2 className="caption fw-bold">Event Ticket limit: 8</h2>
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
								<span className="caption fw-normal text-muted">
									$24.75 ea + Fees
								</span>
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
				<Stack direction="horizontal" gap={3} className="align-items-center footer">
					<Link
						to={'/'}
						className="btn btn--icon-lg btn-outline-light"
						aria-label="shopping Cart">
						<img src={shoppingCart} alt="shopping cart" width="21" height="21" />
					</Link>
					<span className="caption text-muted">or</span>

					<Link to={'/checkout'} className="btn mt-0 w-100 btn-secondary btn-lg">
						Checkout
					</Link>
				</Stack>
			</div>
		</Fragment>
	);
}
