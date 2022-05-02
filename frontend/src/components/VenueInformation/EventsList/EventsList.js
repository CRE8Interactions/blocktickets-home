import React from 'react';
import * as moment from 'moment';

import Stack from 'react-bootstrap/Stack';

import { IconButton } from '../../IconButton';
import { SpinnerContainer } from '../../SpinnerContainer';

import './eventsList.scss';

export default function EventsList({ venue }) {
	return (
		<Stack as="ul">
			{venue[0] && venue[0].allEvents.map((event, index) => {
				return (
					<Stack as="li" direction="horizontal" className="item" gap={3} key={index}>
						<img
							src={ event?.image?.url }
							alt={ event?.name }
							width="120"
							height="120"
							className="event-image"
						/>

						<div className="event-info d-flex-column flex-lg-row gap-2 align-items-lg-center ">
							<div className="w-100">
								<p className="event-title">{ event?.name }</p>
								<div>
									<span className="fw-bolder text-muted  small">{moment(event?.start).format('MMM DD h:mmA')}</span>
								</div>
							</div>
							<IconButton
							link={`/tickets/${event?.id}?type=genAdmission `}
								variant="outline-light"
								btn="tickets--primary"
								styles="align-self-start ms-lg-auto text-primary mt-0">
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
