import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import { OrderSummary } from '../OrderSummary';
import { RefundModal } from '../RefundModal';
import { BackButton } from "./../BackButton";

export default function RefundTicketWrapper({ orderId, ticketId }) {

    const [show, setShow] = useState(false);

    // demo - same orders array that is built from data from database 
    const ordersObj = [
        {
            orderId: 19331942333101,
            marketType: 'primary',
            ticketBuyer: {
                firstName: 'harrison',
                lastName: 'cogan'
            },
            ticketType: 'general_admission',
            totalTickets: 2,
            tickets: [
                {
                    id: 10001,
                    status: 'standard',
                    price: 45.50
                },
                {
                    id: 11111,
                    status: 'standard',
                    price: 45.50
                }
            ],
            status:
            {
                key: 'Purchased by',
                name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)'
            }

        },
        {
            orderId: 19331942333102,
            marketType: 'primary',
            ticketBuyer: {
                firstName: 'billy',
                lastName: 'bob'
            },
            totalTickets: 2,
            ticketType: 'general_admission',
            tickets: [
                {
                    id: 10002,
                    status: 'transferred',
                    price: 0
                },
                {
                    id: 10002,
                    status: 'transferred',
                    price: 0
                },
            ],
            status: {
                key: 'Transferred by',
                name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)'
            }

        },
        {
            orderId: 19331942333103,
            marketType: 'primary',
            ticketBuyer: {
                firstName: 'harrison',
                lastName: 'cogan'
            },
            totalTickets: 2,
            ticketType: 'general_admission',
            tickets: [
                {
                    id: 10003,
                    status: 'transferred',
                    price: 45.50
                },
                {
                    id: 10003,
                    status: 'transferred',
                    price: 45.50
                },
            ],
            status: {
                key: 'Purchased by',
                name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)'
            },
            refund: {
                date: 'Feb 12, 2022 at 4:29 PM (EDT)'
            }

        },
        {
            orderId: 19331942333104,
            marketType: 'secondary',
            ticketBuyer: {
                firstName: 'chaz',
                lastName: 'haskins'
            },
            ticketType: 'general_admission',
            totalTickets: 2,
            tickets: [
                {
                    id: 10004,
                    status: 'standard',
                    price: 80
                },
                {
                    id: 11114,
                    status: 'standard',
                    price: 80
                }
            ],
            status:
            {
                key: 'Sold by',
                name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)'

            }
        },
        {
            orderId: 19331942333105,
            marketType: 'secondary',
            ticketBuyer: {
                firstName: 'harry',
                lastName: 'walkins'
            },
            ticketType: 'general_admission',
            totalTickets: 2,
            tickets: [
                {
                    id: 10004,
                    status: 'transferred',
                    price: 0
                },
                {
                    id: 11114,
                    status: 'transferred',
                    price: 0
                }
            ],
            status:
            {
                key: 'Transferred by',
                name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)'

            }
        },
        {
            orderId: 19331942333106,
            marketType: 'secondary',
            ticketBuyer: {
                firstName: 'harrison',
                lastName: 'cogan'
            },
            totalTickets: 2,
            ticketType: 'general_admission',
            tickets: [
                {
                    id: 10006,
                    status: 'transferred',
                    price: 45.50
                },
                {
                    id: 10006,
                    status: 'transferred',
                    price: 45.50
                },
            ],
            status: {
                key: 'Sold by',
                name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)'
            },
            refund: {
                date: 'Feb 12, 2022 at 4:29 PM (EDT)'
            }
        },
    ]

    const order = ordersObj.find(order => order.orderId == orderId)

    const ticket = order.tickets.find(ticket => ticket.id == ticketId)

    const handleShow = () => setShow(true)

    const handleClose = () => setShow(false)

    return (
        <>
            <section className='max-width-wrapper'>
                <header className='section-header'>
                    <div className="section-heading">
                        <h1>Refund {ticket ? 'ticket' : 'order'}</h1>
                    </div>
                    <p className='section-header-desc'>Issue an attendee a refund for their original ticket price</p>
                </header>
                <Stack as="ul" gap={4}>
                    <OrderSummary order={order} ticket={ticket} showDropdown={false} isOpen={true} />
                </Stack>
                <Stack direction='horizontal' className='btn-group-flex'>
                    <BackButton />
                    <Button size="lg" onClick={handleShow}>Refund</Button>
                </Stack>
            </section>

            <RefundModal show={show} handleClose={handleClose} />
        </>
    );
}
