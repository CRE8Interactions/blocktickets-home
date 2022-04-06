import React from 'react';

import Stack from 'react-bootstrap/Stack';

import { IconButton } from '../../IconButton';
import { SpinnerContainer } from '../../SpinnerContainer';

import './venueList.scss';

export default function VenueList() {
	return (
		<Stack as="ul">
			<Stack as="li" direction="horizontal" className="item" gap={4}>
				<img
					src=""
					alt="The future Nostalgia Tour"
					width="100"
					height="100"
					className="rounded-corners venue-image"
				/>

				<div className="d-flex flex-wrap gap-2 align-items-center flex-grow-1">
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
				</div>
			</Stack>
			<Stack as="li" direction="horizontal" className="item" gap={4}>
				<img
					src=""
					alt="The future Nostalgia Tour"
					width="100"
					height="100"
					className="rounded-corners venue-image"
				/>

				<div className="d-flex flex-wrap gap-2 align-items-center flex-grow-1">
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
				</div>
			</Stack>
			<Stack as="li" direction="horizontal" className="item" gap={4}>
				<img
					src=""
					alt="The future Nostalgia Tour"
					width="100"
					height="100"
					className="rounded-corners venue-image"
				/>

				<div className="d-flex flex-wrap gap-2 align-items-center flex-grow-1">
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
				</div>
			</Stack>
			<Stack as="li" direction="horizontal" className="item" gap={4}>
				<img
					src=""
					alt="The future Nostalgia Tour"
					width="100"
					height="100"
					className="rounded-corners venue-image"
				/>

				<div className="d-flex flex-wrap gap-2 align-items-center flex-grow-1">
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
				</div>
			</Stack>

			<Stack as="li" direction="horizontal" className="item" gap={4}>
				<img
					src=""
					alt="The future Nostalgia Tour"
					width="100"
					height="100"
					className="rounded-corners venue-image"
				/>

				<div className="d-flex flex-wrap gap-2 align-items-center flex-grow-1">
					<div>
						<p className="event-title">Dua Lipa: The future Nostalgia Tour</p>
						<div>
							<span className="fw-bold small">Mar 13 9:30PM</span>
						</div>
					</div>
					<IconButton
						link={'tickets/1'}
						variant="outline-light"
						btn="tickets--primary"
						styles="ms-lg-auto text-primary mt-0">
						Get Tickets
					</IconButton>
				</div>
			</Stack>
			<SpinnerContainer />
		</Stack>
	);
}
