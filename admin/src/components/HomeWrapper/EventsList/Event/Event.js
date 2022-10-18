import React from "react";
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import moment from 'moment';

import { formatDateTime } from "../../../../utilities/helpers";

import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import ProgressBar from "react-bootstrap/ProgressBar";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";

import { StatRow } from "../../../StatRow";
import { MoreIcon } from "../../../MoreIcon"

import placeholder from '../../../../assets/placeholder.png';

export default function Event({ event, eventStatus, handleShow }) {

    const calculatePercentage = (event, type) => {
        let number = 0;
        if (type === 'primary') { number = event?.primarySoldPercentage.toFixed(2) }
        if (type === 'secondary') { number = event?.secondarySoldPercentage }
        return (
            <>
                <ProgressBar now={number} />
            </>
        )
    }

    const getStatus = (status) => {
        switch (status) {
            case 'published':
                return 'On sale'

            case 'draft':
                return 'Draft'

            case 'past':
                return 'Event ended'

            default:
                break;
        }
    }

    return (
        <div className='flex-row justify-content-between' role="rowgroup">
            <Link className="d-flex flex-grow-1" to={`/myevent/${event?.eventUUID}`}>
                <div className='list-table-col' role="cell">
                    <Stack direction="horizontal" gap={4}>
                        <Image src={event?.eventImage || placeholder} alt={event?.eventName} rounded className="event-image" width="80" height="80" />
                        <div className="py-1 event-details">
                            <p className="normal text-body fw-bold text-truncate">{event?.eventName}</p>
                            <p className="text-body fw-bold text-truncate">{event?.venueName}</p>
                            <p className="text-muted fw-medium mt-1 text-truncate">
                                {formatDateTime(moment(event?.eventDate))}
                            </p>
                        </div>
                    </Stack>
                </div>
                <div className="list-table-col d-flex" role="cell">
                    <Stack>
                        <Badge bg='light' className="badge-label">{event?.primarySold} / {event?.primaryAvailable}</Badge>
                        {eventStatus === 'published' && (
                            <Stack direction="horizontal">
                                {calculatePercentage(event, 'primary')}
                            </Stack>)}
                    </Stack>
                </div>
                <div className="list-table-col d-flex" role="cell">
                    <Stack>
                        <Badge bg='light' className="badge-label">${event?.primaryGross}</Badge>
                        {eventStatus === 'published' && (
                            <Stack direction="horizontal">
                                <StatRow
                                    stat="up" statAmount="55.8" text="this week" />
                            </Stack>
                        )}
                    </Stack>
                </div>
                {/* <div className="list-table-col lg" role="cell">
                <Stack>
                    <Badge bg='light' className="badge-label">{calculateSold(event?.tickets)}</Badge>
                    {eventStatus === 'published' && (
                        <Stack direction="horizontal">
                            <ProgressBar now={20} />
                        </Stack>
                    )}
                </Stack>
            </div> */}
                {/* <div className="list-table-col lg" role="cell">
                <Stack>
                    <Badge bg='light' className="badge-label">$3,200</Badge>
                    {eventStatus === 'published' && (
                        <StatRow
                            stat="up" statAmount="55.8" text="this week" />
                    )}
                </Stack>
            </div> */}
                <div className="list-table-col d-flex-column text-center" role="cell">
                    <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                        <span className="text-body">{getStatus(eventStatus)}</span></div>
                </div>
            </Link>
            <div className="btn-more-col list-table-col" role="cell">
                <Dropdown className="btn-more" align="right">
                    <Dropdown.Toggle variant="default">
                        <MoreIcon />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <ul>
                            <li>
                                <LinkContainer to={`/myevent/${event?.eventUUID}`}>
                                    <Dropdown.Item className="btn-view">Manage</Dropdown.Item>
                                </LinkContainer>
                            </li>
                            <li>
                                <Dropdown.Item className="btn-copy" as="button">Copy URL</Dropdown.Item>
                            </li>
                            <li>
                                <Dropdown.Item as="button"
                                    className="btn-delete" onClick={handleShow}>Delete</Dropdown.Item>
                            </li>
                        </ul>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}