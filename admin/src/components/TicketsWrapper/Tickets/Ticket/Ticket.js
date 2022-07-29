import React from 'react';

import { formatString } from '../../../../utilities/helpers';

import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';

import { EditDeleteDropdown } from '../../../EditDeleteDropdown';

export default function Ticket({ ticket, handleEdit, handleShow }) {

    const ticketStatusColors = [
        {
            'on_sale': 'success',
            'scheduled': 'primary',
            'sale_ended': 'dark'
        }
    ]

    const formatTicketStatus = (status) => {
        return formatString(status)
    }

    const getTicketStatusColor = (status) => {
        return ticketStatusColors.map((obj) => obj[status])
    }

    return (
        <Stack direction='horizontal' as="li" className='list-item ticket-row'>
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
            <EditDeleteDropdown handleShow={handleShow} onClick={() => handleEdit(ticket)} />
        </Stack>
    );
}
