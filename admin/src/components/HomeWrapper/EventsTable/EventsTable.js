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

    let sum;

    if (events && type === 'published') events = events.filter((event) => event?.status === 'on_sale')
    if (events && (type === 'draft')) events = events.filter((event) => (event?.status === 'unpublished' || event?.status === 'scheduled'))
    if (events && type === 'past') events = events.filter((event) => event?.status === 'published' && moment(event?.start) < moment())
    
    const calculateSold = (tickets, type) => {
        let isResale = type === 'secondary' ? true : false
        let availableTickets = tickets.filter((ticket) => ticket.resale === isResale);
        let soldTickets = tickets.filter((ticket) => ticket.on_sale_status === 'sold' && ticket.resale === isResale)
        let availableCount = availableTickets.length
        let soldCount = soldTickets.length
        let percentage = (soldCount / availableCount) * 100
        let prices = soldTickets.map(ticket => ticket.cost + ticket.fee);
        sum = prices.reduce((a, b) => a + b, 0);

        return (
            <>
                <p> {soldCount} / {availableCount} </p>
            </>
        )
    }

    const calculatePercentage = (tickets, type) => {
        let isResale = type === 'secondary' ? true : false
        let availableTickets = tickets.filter((ticket) => ticket.resale === isResale);
        let soldTickets = tickets.filter((ticket) => ticket.on_sale_status === 'sold')
        let availableCount = availableTickets.length
        let soldCount = soldTickets.length
        let percentage = (soldCount / availableCount) * 100

        return (
            <>
                <ProgressBar now={percentage} />
            </>
        )
    }

    const getGross = (tickets, type) => {
        let isResale = type === 'secondary' ? true : false
        let availableTickets = tickets.filter((ticket) => ticket.resale === isResale);
        let soldTickets = tickets.filter((ticket) => ticket.on_sale_status === 'sold')
        let soldTotals = soldTickets.map((ticket) => (ticket.cost + ticket.fee))
        let sum = soldTotals.reduce((a,b) => a + b, 0)
        return (
            <>
                <Badge bg='light' className="badge-label">${parseFloat(sum).toFixed(2)}</Badge>
            </>
        )
    }

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
                                    <Image src={event?.image?.url} alt={event?.name} rounded width="80" height="80" />
                                    <div className="py-1 event-details">
                                        <p className="normal text-body fw-bold text-truncate">{event?.name}</p>
                                        <p className="text-body fw-bold text-truncate">{event?.venue?.name}</p>
                                        <p className="text-muted fw-medium mt-1 text-truncate">{moment(event?.start).format('MMM DD, yyyy')}</p>
                                    </div>
                                </Stack>
                            </td>
                            <td>
                                <Stack>
                                    <Badge bg='light' className="badge-label">{calculateSold(event?.tickets, 'primary')}</Badge>
                                    {type === 'published' && (
                                        <Stack direction="horizontal">
                                            { calculatePercentage(event?.tickets, 'primary') }
                                        </Stack>)}
                                </Stack>
                            </td>
                            <td>
                                <Stack>
                                { getGross(event?.tickets, 'primary') }
                                    {type === 'published' && (
                                        <StatRow
                                            stat="up" statAmount="55.8" text="this week" />
                                    )}
                                </Stack>
                            </td>
                            <td>
                                <Stack>
                                    <Badge bg='light' className="badge-label">{calculateSold(event?.tickets, 'secondary')}</Badge>
                                    {type === 'published' && (
                                        <Stack direction="horizontal">
                                            { calculatePercentage(event?.tickets, 'secondary') }
                                        </Stack>
                                    )}
                                </Stack>
                            </td>
                            <td>
                                <Stack>
                                    { getGross(event?.tickets, 'secondary') }
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
                                                <LinkContainer to={`/myevent/${event?.uuid}`}>
                                                    <Dropdown.Item className="btn-view">View</Dropdown.Item>
                                                </LinkContainer>
                                            </li>
                                            <li>
                                                <LinkContainer to={`/myevent/${event?.uuid}/basic-info`}>
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