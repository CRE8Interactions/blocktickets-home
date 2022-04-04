import React, { Fragment } from 'react';

import Col from 'react-bootstrap/Col';

import { AddOns } from './AddOns';
import { Payment } from './Payment';
import { TotalCard } from './TotalCard';
import { BackButton } from '../../BackButton';

import './checkout.scss';

export default function Checkout({ addOns, setStatus }) {
	return (
		<Fragment>
			<Col md={6}>
				<BackButton />
				<div className="d-flex-column">
					<div className="scrollable-container">
						<div className="scrollable-content">
							<div className="content">
								{addOns.length > 0 && (
									<section id="addOns">
										<AddOns />
									</section>
								)}
								<section>
									<Payment />
								</section>
							</div>
						</div>
					</div>
				</div>
			</Col>
			<Col md={6} lg={5} id="total-card">
				<TotalCard setStatus={setStatus} addOns={addOns} />
			</Col>
		</Fragment>
	);
}
