import React from 'react';
import * as moment from 'moment';

import { formatDateTime, getStartDateFormatter } from '../../../utilities/helpers';

import Stack from 'react-bootstrap/Stack';

import { IconButton } from '../../IconButton';
import { SpinnerContainer } from '../../SpinnerContainer';

import placeholder from '../../../assets/placeholder.png'

import './eventsList.scss';

export default function EventsList({ venue }) {
    return (
        <Stack as="ul">
            {venue && venue.allEvents.map((event, index) => {
                return (
                    <Stack as="li" direction="horizontal" className="item" gap={3} key={index}>
                        <img
                            src={event?.image?.url || placeholder}
                            alt={event?.name}
                            width="100"
                            height="100"
                            className="event-image"
                        />

                        <div className="event-info d-flex-column flex-lg-row gap-2 align-items-lg-center ">
                            <div className="event-name-date-wrapper">
                                <p className="event-name">{event?.name}</p>
                                <div>
                                    <span className="fw-bold text-muted small">{formatDateTime(moment(event?.start), getStartDateFormatter(event))}</span>
                                </div>
                            </div>
                            <IconButton
                                link={`/tickets/${event?.uuid}`}
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
