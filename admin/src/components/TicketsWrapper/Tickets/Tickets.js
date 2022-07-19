import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

import { NoDataContainer } from '../../NoDataContainer';
import { Ticket } from '../Ticket';
import { DeleteModal } from './DeleteModal';

import './tickets.scss';

export default function Tickets({ tickets, handleAction }) {

    const navigate = useNavigate();

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleEdit = (ticket) => {
        handleAction ? handleAction('edit', ticket) : navigate(`edit?id=${ticket.id}`)
    }

    return (
        <>
            <Card body>
                <>
                    {tickets && tickets.length > 0 ? (
                        <>
                            <Stack gap={2} as="ul" className="pb-4 tickets">
                                {(tickets).map((ticket, id) => (
                                    <Ticket key={id} ticket={ticket} handleEdit={handleEdit} handleShow={handleShow} />
                                ))}
                            </Stack>
                            <Stack direction='horizontal' className='pt-3 split-row'>
                                <span className='fw-medium normal'>Event capacity</span>
                                <span className='fw-medium normal'>112/400</span>
                            </Stack>

                        </>
                    ) : (
                        <NoDataContainer style="center">
                            <p>You don’t have any tickets, please create at least one to continue on next steps</p>
                        </NoDataContainer>
                    )
                    }
                </>
            </Card>
            <DeleteModal show={show} handleClose={handleClose}></DeleteModal>
        </>
    );
}
