import React from 'react';

import { removeHyphens, formatCurrency } from '../../../../utilities/helpers';

import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';

import { EditDeleteDropdown } from '../../../EditDeleteDropdown';

export default function Ticket({ ticket, handleShow }) {

    const ticketStatusColors = [
        {
            'on_sale': 'success',
            'scheduled': 'primary',
            'sale_ended': 'dark'
        }
    ]

    const formatTicketStatus = (status) => {
        return removeHyphens(status)
    }

    const getTicketStatusColor = (status) => {
        return ticketStatusColors.map((obj) => obj[status])
    }

    const getDescription = (time) => {
        if (moment(time) < moment()) {
            return `Ends ${moment(time).format('MMM DD, yyyy')} at ${moment(time).format('h:mm A')}`
        } else if (moment(time) > moment()) {
            return `Starts ${moment(time).format('MMM DD, yyyy')} at ${moment(time).format('h:mm A')}`
        } else if (moment(time) >= moment()) {
            return moment(time)
        }
    }

    return (
        <Stack direction='horizontal' as="li" className='list-item ticket-row'>
            <Stack>
                <h2 className='ticket-name normal text-truncate'>{ticket?.name}</h2>
                <Stack direction='horizontal' gap={2}>
                    <Badge bg={getTicketStatusColor(ticket?.status)} className='text-uppercase'>{formatTicketStatus(ticket?.status)}</Badge>
                    <span className='text-muted small'>{getDescription(ticket?.desc)}</span>
                </Stack>
            </Stack>
            <Stack>
                <span>{ticket?.sold}/{ticket?.count}</span>
            </Stack>
            <Stack>
                <span>{ticket?.price && ticket?.price > 0 ? formatCurrency(ticket?.price) : 'Free'}</span>
            </Stack>
            <EditDeleteDropdown canDelete={ticket?.status !== "on_sale"} handleShow={handleShow} link='edit' search={`?type=${encodeURIComponent((ticket?.name))}`} />
        </Stack>
    );
}
