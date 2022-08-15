import React, { useEffect, useContext, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";

import OrganizationContext from "../../../context/Organization/Organization";
import { publishEvent } from "../../../utilities/api";

import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import ProgressBar from "react-bootstrap/ProgressBar";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";

import { StatRow } from "./../../StatRow";
import { DeleteModal } from './DeleteModal';
import { MoreIcon } from "../../MoreIcon";

import thumbnail from '../../../assets/profile-thumbnail.png'

import './eventsTable.scss';

import moment from 'moment';

export default function EventsTable({ type, events }) {

    const org = useContext(OrganizationContext)
    const [event, setEvent] = useState()
    const [gross, setGross] = useState()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    let sum;
    let selectedEvent;
    
    if (events && type === 'published') events = events.filter((event) => event?.status === 'published')
    if (events && type === 'draft') events = events.filter((event) => event?.status === 'unpublished')
    if (events && type === 'past') events = events.filter((event) => moment(event?.start) < moment())

    const calculateSold = (tickets) => {
        let availableTickets = tickets
        let soldTickets = tickets.filter((ticket) => ticket.on_sale_status === 'sold')
        let availableCount = availableTickets.length
        let soldCount = soldTickets.length
        let percentage = (soldCount / availableCount) * 100
        let prices = soldTickets.map(ticket => ticket.cost + ticket.fee);
        sum = prices.reduce((a, b) => a + b, 0);

        return (
            <>
                <p> {soldCount} / {availableCount} </p>
                <ProgressBar now={percentage} />
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

    const publish = (event) => {
        publishEvent(event)
            .then((res) => {
                let updateEvent = events.find(e => e.id === event.id)
                updateEvent.status = 'on_sale'
                handleClose()
            })
            .catch((err) => console.error(err))
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
                                    <Badge bg='light' className="badge-label">{calculateSold(event?.tickets)}</Badge>
                                    {type === 'published' && (
                                        <Stack direction="horizontal">
                                            <ProgressBar now={20} />
                                        </Stack>)}
                                </Stack>
                                {/* { calculateSold(event.tickets)} */}
                            </td>
                            <td>
                                <Stack>
                                    <Badge bg='light' className="badge-label">$3,200</Badge>
                                    {type === 'published' && (
                                        <StatRow
                                            stat="up" statAmount="55.8" text="this week" />
                                    )}
                                </Stack>
                            </td>
                            <td>
                                <Stack>
                                    <Badge bg='light' className="badge-label">{calculateSold(event?.tickets)}</Badge>
                                    {type === 'published' && (
                                        <Stack direction="horizontal">
                                            <ProgressBar now={20} />
                                        </Stack>
                                    )}
                                </Stack>
                                {/* { calculateSold(event.tickets)} */}
                            </td>
                            <td>
                                <Stack>
                                    <Badge bg='light' className="badge-label">$3,200</Badge>
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