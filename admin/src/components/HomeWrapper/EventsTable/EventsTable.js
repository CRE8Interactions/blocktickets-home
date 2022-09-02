import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";

import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import ProgressBar from "react-bootstrap/ProgressBar";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";

import { StatRow } from "../../StatRow";
import { DeleteModal } from './DeleteModal';
import { MoreIcon } from "../../MoreIcon";

import './eventsTable.scss';

import moment from 'moment';

export default function EventsTable({ type, events }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    if (events && type === 'published') events = events.filter((event) => event?.status === 'on_sale')
    if (events && (type === 'draft')) events = events.filter((event) => (event?.status === 'unpublished' || event?.status === 'scheduled'))
    if (events && type === 'past') events = events.filter((event) => event?.status === 'published' && moment(event?.start) < moment())
    
    const getStatus = (type) => {
        switch (type) {
            case 'published':
                return 'Event on sale'

            case 'draft':
                return 'Draft'

            case 'past':
                return 'Event ended'

            default:
                break;
        }
    }

    const calculatePercentage = (number) => {
        return (
            <>
                <ProgressBar now={number} />
            </>
        )
    }

    return (
        <>
            <Table hover id="events-table">
                <thead>
                    <tr>
                        <th colSpan="2">Event</th>
                        <th>Primary sold</th>
                        <th>Gross</th>
                        <th>Secondary sold</th>
                        <th>Royalties</th>
                        <th className="
          text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {events?.map((event, index) => (
                        <tr key={index}>
                            <td colSpan="2">
                                <Stack direction="horizontal" gap={4}>
                                    <Image src={event?.eventImage} alt={event?.eventName} rounded width="80" height="80" />
                                    <div className="py-1 event-details">
                                        <p className="normal text-body fw-bold text-truncate">{event?.eventName}</p>
                                        <p className="text-body fw-bold text-truncate">{event?.venueName}</p>
                                        <p className="text-muted fw-medium mt-1 text-truncate">{moment(event?.eventDate).format('MMM DD, yyyy')}</p>
                                    </div>
                                </Stack>
                            </td>
                            <td>
                                <Stack>
                                    <Badge bg='light' className="badge-label">{event?.primarySold} / {event?.primaryAvailable}</Badge>
                                    {type === 'published' && (
                                        <Stack direction="horizontal">
                                            { calculatePercentage(event?.primarySoldPercentage.toFixed(2)) }
                                        </Stack>)}
                                </Stack>
                            </td>
                            <td>
                                <Stack>
                                ${ event?.primaryGross }
                                    {type === 'published' && (
                                        <StatRow
                                            stat="up" statAmount="55.8" text="this week" />
                                    )}
                                </Stack>
                            </td>
                            <td>
                                <Stack>
                                    <Badge bg='light' className="badge-label">{event?.secondarySold} / {event?.secondaryAvailable}</Badge>
                                    {type === 'published' && (
                                        <Stack direction="horizontal">
                                            { calculatePercentage(event?.secondarySoldPercentage.toFixed(2)) }
                                        </Stack>
                                    )}
                                </Stack>
                            </td>
                            <td>
                                <Stack>
                                    ${ event?.royalties }
                                    {type === 'published' && (
                                        <StatRow
                                            stat="up" statAmount="55.8" text="this week" />
                                    )}
                                </Stack>
                            </td>
                            <td className="text-body">{getStatus(type)}</td>
                            <td className="btn-more">
                                <Dropdown align="right">
                                    <Dropdown.Toggle variant="default">
                                        <MoreIcon />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <ul>
                                            <li>
                                                <LinkContainer to={`/myevent/${event?.eventUUID}`}>
                                                    <Dropdown.Item className="btn-view">View</Dropdown.Item>
                                                </LinkContainer>
                                            </li>
                                            <li>
                                                <LinkContainer to={`/myevent/${event?.eventUUID}/basic-info`}>
                                                    <Dropdown.Item className="btn-edit">Edit</Dropdown.Item>
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <DeleteModal show={show} handleClose={handleClose}></DeleteModal>
        </>
    )
}