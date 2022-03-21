import React from 'react';
import { BackButton } from '../../../../BackButton';
import { PriceRangeSlider } from '../PriceRangeSlider';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import './filterModal.scss';

export default function FilterModal({ setShow, show }) {
	return (
		<div className="filter">
			<div id="collapsible-panel-example-1">
				<Form>
					<PriceRangeSlider className="mobile-only" />
					<header>
						<Stack direction="horizontal" className=" heading--flex">
							<h3 className="m-0 normal text-uppercase">Filters</h3>
							<BackButton handleGoBack={() => setShow(!show)} />
						</Stack>
						<Form.Check type="checkbox" label="Show prices with fees" />
					</header>
					<legend>
						<p className="caption--uppercase text-muted legend-heading">Ticket Type</p>
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
							<Form.Check
								type="switch"
								id="custom-switch"
								aria-label="Toggle Accessibility"
							/>
						</Stack>
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
					</legend>
					<Stack direction="horizontal" className="footer btn-group-flex" gap={3}>
						<Button variant="outline-light" size="lg" className="mt-0">
							Cancel
						</Button>
						<Button variant="primary" size="lg" type="submit" className="mt-0">
							Apply Filters
						</Button>
					</Stack>
				</Form>
			</div>
		</div>
	);
}
