import React, { useState } from 'react';

import { BackButton } from '../../../../BackButton';
import { PriceRangeSlider } from '../PriceRangeSlider';
import { TicketPurchaseFooter } from '../../TicketPurchaseFooter';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import './filterMenu.scss';

export default function FilterMenu({ setShow, show, sliderValues, setSliderValues }) {
	const [
		on,
		setOn
	] = useState(false);

	const handleFilter = (action) => {
		setShow(false);
	};

	return (
		<Stack direction="vertical" className={`filter-panel ${show && 'filter-panel--open'}`}>
			<Stack direction="vertical">
				<header>
					<Stack direction="horizontal" className=" heading--flex">
						<h3 className="normal text-uppercase">Filters</h3>
						<BackButton handleGoBack={() => setShow(!show)} />
					</Stack>
					<PriceRangeSlider
						styles="mobile-only"
						sliderValues={sliderValues}
						setSliderValues={setSliderValues}
					/>
					<Form.Check
						type="checkbox"
						label="Show prices with fees"
						id="fees"
						className="fw-bold"
					/>
				</header>
				<div className="filter-container">
					<div className="scrollable-content">
						<legend>
							<p className="caption--uppercase text-muted legend-heading">
								Ticket Type
							</p>
							<ul>
								<li>
									<Form.Check
										type="checkbox"
										id="standard"
										label="Standard Admission"
									/>
								</li>
								<li>
									<Form.Check
										type="checkbox"
										id="resale"
										label="Verified Resale Ticket"
									/>
								</li>
							</ul>
						</legend>
						<legend>
							<Stack direction="horizontal" className="heading--flex">
								<p className="small legend-heading accessibility">Accessibility</p>
								<Form.Switch
									onChange={() => setOn(!on)}
									value={on}
									id="custom-switch"
									aria-label="Toggle Accessibility"
								/>
							</Stack>
							<div className="accessibility-body">
								{on && (
									<ul>
										<li>
											<Form.Check
												type="checkbox"
												id="impairment"
												label="Vision and/or hearing impairment"
											/>
										</li>
										<li>
											<Form.Check
												type="checkbox"
												id="wheelchair"
												label="Wheelchair Accessible"
											/>
										</li>
									</ul>
								)}
							</div>
						</legend>
					</div>
				</div>
				<TicketPurchaseFooter>
					<Button variant="outline-light" onClick={() => handleFilter('clear')} size="lg">
						Clear all
					</Button>
					<Button variant="primary" size="lg" onClick={() => handleFilter('apply')}>
						Apply Filters
					</Button>
				</TicketPurchaseFooter>
			</Stack>
		</Stack>
	);
}