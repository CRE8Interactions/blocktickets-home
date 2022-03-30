import React from 'react';

import { Stack } from 'react-bootstrap';
import { IconButton } from '../../IconButton';
import { Spinner } from './../../Spinner';

import './venueList.scss';

export default function VenueList() {
	return (
		<Stack as="ul">
			<Stack as="li" direction="horizontal" gap={4}>
				<img
					src=""
					alt="The future Nostalgia Tour"
					width="100"
					height="100"
					className="rounded-corners"
				/>
				<div>
					<p className="event-title">Dua Lipa: The future Nostalgia Tour</p>
					<div>
						<span className="fw-bold small">Mar 13 9:30PM</span>
					</div>
				</div>
				<IconButton
					variant="outline-light"
					btn="tickets--primary"
					styles="ms-lg-auto text-primary mt-0">
					Get Tickets
				</IconButton>
			</Stack>
			<Stack as="li" direction="horizontal" gap={4}>
				<img
					src=""
					alt="The future Nostalgia Tour"
					width="100"
					height="100"
					className="rounded-corners"
				/>
				<div>
					<p className="event-title">Dua Lipa: The future Nostalgia Tour</p>
					<div>
						<span className="fw-bold small">Mar 13 9:30PM</span>
					</div>
				</div>
				<IconButton
					variant="outline-light"
					btn="tickets--primary"
					styles="ms-lg-auto text-primary mt-0">
					Get Tickets
				</IconButton>
			</Stack>
			<Stack as="li" direction="horizontal" gap={4}>
				<img
					src=""
					alt="The future Nostalgia Tour"
					width="100"
					height="100"
					className="rounded-corners"
				/>
				<div>
					<p className="event-title">Dua Lipa: The future Nostalgia Tour</p>
					<div>
						<span className="fw-bold small">Mar 13 9:30PM</span>
					</div>
				</div>
				<IconButton
					variant="outline-light"
					btn="tickets--primary"
					styles="ms-lg-auto text-primary mt-0">
					Get Tickets
				</IconButton>
			</Stack>
			<Stack as="li" direction="horizontal" gap={4}>
				<img
					src=""
					alt="The future Nostalgia Tour"
					width="100"
					height="100"
					className="rounded-corners"
				/>
				<div>
					<p className="event-title">Dua Lipa: The future Nostalgia Tour</p>
					<div>
						<span className="fw-bold small">Mar 13 9:30PM</span>
					</div>
				</div>
				<IconButton
					variant="outline-light"
					btn="tickets--primary"
					styles="ms-lg-auto text-primary mt-0">
					Get Tickets
				</IconButton>
			</Stack>

			<Stack as="li" direction="horizontal" gap={4}>
				<img
					src=""
					alt="The future Nostalgia Tour"
					width="100"
					height="100"
					className="rounded-corners"
				/>
				<div>
					<p className="event-title">Dua Lipa: The future Nostalgia Tour</p>
					<div>
						<span className="fw-bold small">Mar 13 9:30PM</span>
					</div>
				</div>
				<IconButton
					variant="outline-light"
					btn="tickets--primary"
					styles="ms-lg-auto text-primary mt-0">
					Get Tickets
				</IconButton>
			</Stack>
			<Spinner />
		</Stack>
	);
}
