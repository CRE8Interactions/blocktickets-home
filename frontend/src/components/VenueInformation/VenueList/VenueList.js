import React, { Fragment } from 'react';

import { Stack } from 'react-bootstrap';
import { IconButton } from '../../IconButton';

import './venueList.scss';

export default function VenueList() {
	return (
		<Fragment>
			<ul>
				<Stack direction="horizontal" className="justify-content-between">
					<img src="" alt="" className="rounded-corners" />
					<div>
						<p className="event-title">Dua Lipa: The future Nostalgia Tour</p>
						<div>
							<span className="fw-bold small">Mar 13 9:30PM</span>
						</div>
					</div>
					<IconButton
						variant="outline-light"
						btn="tickets--primary"
						styles="text-primary mt-0">
						Get Tickets
					</IconButton>
				</Stack>
			</ul>
		</Fragment>
	);
}
