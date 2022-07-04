import React, { useState } from 'react';

import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';

import { NoDataContainer } from '../../NoDataContainer';
import { DeleteModal } from './DeleteModal';

import './tickets.scss';

export default function Tickets({ tickets, handleEdit }) {

    const ticketStatusColors = [
        {
            'on_sale': 'success',
            'scheduled': 'primary',
            'sale_ended': 'dark'
        }
    ]

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const formatTicketStatus = (status) => {
        return status.replaceAll('_', " ")
    }

    const getTicketStatusColor = (status) => {
        return ticketStatusColors.map((obj) => obj[status])
    }

    return (
        <>
            {tickets && tickets.length > 0 ? (
                <>
                    <Stack gap={2} className="pb-4 tickets">
                        {(tickets).map((ticket, id) => (
                            <Stack direction='horizontal' className='ticket-row' key={id}>
                                <Stack>
                                    <h2 className='normal'>{ticket.type}</h2>
                                    <Stack direction='horizontal' gap={2}>
                                        <Badge bg={getTicketStatusColor(ticket.status)} className='text-uppercase'>{formatTicketStatus(ticket.status)}</Badge>
                                        <span className='text-muted small'>{ticket.desc}</span>
                                    </Stack>
                                </Stack>
                                <Stack>
                                    <span>{ticket.ticketsSold}</span>
                                </Stack>
                                <Stack>
                                    <span>${ticket.price.toFixed(2)}</span>
                                </Stack>
                                <Stack>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="default"></Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as="button" className="btn-edit" onClick={() => handleEdit(ticket.id)}>Edit</Dropdown.Item>
                                            <Dropdown.Item as="button" className="btn-delete" onClick={handleShow}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Stack>
                            </Stack>
                        ))}
                    </Stack>
                    <Stack direction='horizontal' className='pt-3 split-row'>
                        <span className='fw-medium normal'>Event capacity</span>
                        <span className='fw-medium normal'>112/400</span>
                    </Stack>

                    <DeleteModal show={show} handleClose={handleClose}></DeleteModal>
                </>
            ) : (
                <NoDataContainer>
                    <p>You don’t have any tickets, please create at least one to continue on next steps</p>
                </NoDataContainer>
            )

            }
        </>
    );
}
