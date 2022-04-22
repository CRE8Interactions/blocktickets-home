import React from 'react';
import * as moment from 'moment';

import Stack from 'react-bootstrap/Stack';

import { IconButton } from '../../IconButton';
import { SpinnerContainer } from '../../SpinnerContainer';

import './venueList.scss';

export default function VenueList({ venue }) {
	return (
		<Stack as="ul">
			{venue[0] && venue[0].allEvents.map((event, index) => {
				return (
					<Stack as="li" direction="horizontal" className="item" gap={4} key={index}>
						<img
							src={ event?.image?.url }
							alt={ event?.name }
							width="120"
							height="120"
							className="rounded venue-image"
						/>

						<div className="d-flex flex-wrap gap-2 align-items-center flex-grow-1">
							<div>
								<p className="event-title">{ event?.name }</p>
								<div>
									<span className="fw-bold small">{moment(event?.start).format('MMM DD h:mmA')}</span>
								</div>
							</div>
							<IconButton
							link={`/tickets/${event?.id}?type=genAdmission `}
								variant="outline-light"
								btn="tickets--primary"
								styles="ms-lg-auto text-primary mt-0">
								Get Tickets
							</IconButton>
						</div>
					</Stack>
				)
			})}
			{/* <SpinnerContainer /> */}
		</Stack>
	);
}
