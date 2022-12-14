import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

import { EmptyContainer } from '../../EmptyContainer';
import { Ticket } from './Ticket';
import { DeleteModal } from './DeleteModal';

import './tickets.scss';

export default function Tickets({ tickets }) {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const sortBy = arr => {
        return arr?.sort(function (a, b) {
            return a.price - b.price
        })
    }
    return (
        <>
            <Card body>
                <>
                    {tickets && tickets.length > 0 ? (
                        <>
                            <Stack gap={2} as="ul" className="pb-4 tickets">
                                {sortBy(tickets).map((ticket, id) =>
                                    <Ticket key={id} ticket={ticket} handleShow={handleShow} />
                                )}
                            </Stack>
                            <Stack direction='horizontal' className='pt-3 split-row'>
                                <span className='fw-medium normal'>Event capacity</span>
                                <span className='fw-medium normal'>{tickets[0]?.totalTicketsSold}/{tickets[0]?.totalTickets}</span>
                            </Stack>

                        </>
                    ) : (
                        <EmptyContainer style="center lg">
                            <p>You don’t have any tickets, please create at least one to publish event</p>
                        </EmptyContainer>
                    )
                    }
                </>
            </Card>
            <DeleteModal show={show} handleClose={handleClose}></DeleteModal>
        </>
    );
}
