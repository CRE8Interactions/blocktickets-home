import React from 'react';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import { OrderSummary } from '../OrderSummary';
import { BackButton } from "./../BackButton";

export default function RefundTicketWrapper({ orderId, ticketId }) {

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
                    status: 'sold',
                    price: 45.50
                },
                {
                    id: 11111,
                    status: 'transferred',
                    price: 45.50
                }
            ],
            status: {
                purchasedBy: [
                    {
                        key: 'Purchased by',
                        name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 2,
                        price: 45.50

                    }
                ],
            }
        },
        {
            orderId: 19331942333102,
            marketType: 'secondary',
            ticketBuyer: {
                firstName: 'harrison',
                lastName: 'cogan'
            },
            ticketType: 'general_admission',
            totalTickets: 2,
            tickets: [
                {
                    id: 10002,
                    status: 'transferred',
                    price: 45.50
                },
                {
                    id: 11112,
                    status: 'transferred',
                    price: 45.50
                }
            ],
            status: {
                purchasedBy: [{
                    key: 'Purchased by',
                    name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                    numTickets: 2,
                    price: 45.50

                }],
                transferredTo: [
                    {
                        key: 'Transferred to',
                        name: 'Chaz Haskins (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1,
                        ticketId: 1935454
                    },
                    {
                        key: 'Transferred to',
                        name: 'Billy Bob (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1,
                        ticketId: 1936565
                    }
                ],
            }
        },
        {
            orderId: 19331942333103,
            marketType: 'primary',
            ticketBuyer: {
                firstName: 'billy',
                lastName: 'bob'
            },
            totalTickets: 1,
            ticketType: 'general_admission',
            totalTickets: 1,
            tickets: [
                {
                    id: 10003,
                    status: 'transferred',
                    price: 45.50
                },
            ],
            status: {
                transferredBy: [
                    {
                        key: 'Transferred by',
                        name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1
                    }
                ],
            }
        },
        {
            orderId: 19331942333104,
            marketType: 'secondary',
            ticketBuyer: {
                firstName: 'harrison',
                lastName: 'cogan'
            },
            ticketType: 'general_admission',
            totalTickets: 2,
            tickets: [
                {
                    id: 10004,
                    status: 'sold',
                    price: 45.50
                },
                {
                    id: 11114,
                    status: 'transferred',
                    price: 45.50
                }
            ],
            status: {
                purchasedBy: [{
                    key: 'Purchased by',
                    name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                    numTickets: 2,
                    price: 45.50

                }],
                transferredTo: [
                    {
                        key: 'Transferred to',
                        name: 'Billy Bob (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 2
                    }
                ],
                soldTo: [
                    {
                        key: 'Sold to',
                        name: 'Chaz Haskins (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1,
                        price: 45.50
                    }
                ]
            }
        },
        {
            orderId: 19331942333105,
            marketType: 'primary',
            ticketBuyer: {
                firstName: 'harrison',
                lastName: 'cogan'
            },
            ticketType: 'general_admission',
            totalTickets: 2,
            tickets: [
                {
                    id: 10005,
                    status: 'sold',
                    price: 45.50
                },
                {
                    id: 11115,
                    status: 'sold',
                    price: 45.50
                }
            ],
            status: {
                purchasedBy: [{
                    key: 'Purchased by',
                    name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                    numTickets: 2,
                    price: 45.50

                }],
                soldTo: [
                    {
                        key: 'Sold to',
                        name: 'Chaz Haskins (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1,
                        price: 45.50
                    },
                    {
                        key: 'Sold to',
                        name: 'Holly Wood (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1,
                        price: 45.50
                    }
                ]
            }
        },
        {
            orderId: 19331942333106,
            marketType: 'secondary',
            ticketBuyer: {
                firstName: 'harrison',
                lastName: 'cogan'
            },
            ticketType: 'general_admission',
            totalTickets: 2,
            tickets: [
                {
                    id: 10006,
                    status: 'sold',
                    price: 80
                },
                {
                    id: 11116,
                    status: 'transferred',
                    price: 80
                }
            ],
            status: {
                purchasedBy: [{
                    key: 'Purchased by',
                    name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                    numTickets: 2,
                    price: 45.50

                }],
                transferredBy: [
                    {
                        key: 'Transferred by',
                        name: 'Billy Bob (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1,
                        price: 45.50
                    }
                ],
                soldTo: [
                    {
                        key: 'Sold to',
                        name: 'Chaz Haskins (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1,
                        price: 45.50
                    }
                ]
            }
        },
        {
            orderId: 19331942333107,
            marketType: 'primary',
            ticketBuyer: {
                firstName: 'robert',
                lastName: 'cogan'
            },
            ticketType: 'general_admission',
            totalTickets: 8,
            tickets: [
                {
                    id: 10007,
                    status: 'transferred',
                    price: 45.50
                },
                {
                    id: 11117,
                    status: 'transferred',
                    price: 45.50
                },
                {
                    id: 22227,
                    status: 'transferred',
                    price: 45.50
                },
                {
                    id: 33337,
                    status: 'transferred',
                    price: 45.50
                },
                {
                    id: 44447,
                    status: 'transferred',
                    price: 45.50
                },
                {
                    id: 55557,
                    status: 'sold',
                    price: 45.50
                },
                {
                    id: 66667,
                    status: 'sold',
                    price: 45.50
                },
                {
                    id: 77777,
                    status: 'sold',
                    price: 45.50
                }
            ],
            status: {
                purchasedBy: [{
                    key: 'Purchased by',
                    name: 'Robert Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                    numTickets: 8,
                    price: 800

                }],
                transferredTo: [
                    {
                        key: 'Transferred to',
                        name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1
                    },
                    {
                        key: 'Transferred to',
                        name: 'Chaz Haskins (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1
                    },
                    {
                        key: 'Transferred to',
                        name: 'Jaime Convery (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1
                    },
                    {
                        key: 'Transferred to',
                        name: 'Spider Man (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1
                    }
                ],
                soldTo: [
                    {
                        key: 'Sold to',
                        name: 'Billy Bob (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1,
                        price: 150
                    },
                    {
                        key: 'Sold to',
                        name: 'Bruce Wayne (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1,
                        price: 150
                    },
                    {
                        key: 'Sold to',
                        name: 'George Farman (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1,
                        price: 150
                    },
                    {
                        key: 'Sold to',
                        name: 'Harry Walker (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)',
                        numTickets: 1,
                        price: 150
                    }
                ],
            }
        }
    ]


    const order = ordersObj.find(order => order.orderId == orderId)

    const ticket = order.tickets.find(ticket => ticket.id == ticketId)

    return (
        <>
            <section>
                <header className='section-header'>
                    <div className="section-heading">
                        <h1>Refund {ticket ? 'ticket' : 'order'}</h1>
                    </div>
                    <p className='section-header-desc'>Issue an attendee a refund for their original ticket price</p>
                </header>
                <Stack as="ul" gap={4}>
                    <OrderSummary order={order} ticket={ticket} showDropdown={false} />
                </Stack>
                <Stack direction='horizontal' className='btn-group-flex'>
                    <BackButton />
                    <Button size="lg">Refund</Button>
                </Stack>
            </section>
        </>
    );
}
