import React, { useLayoutEffect, useEffect, useState } from 'react';

import { getOrder } from '../../utilities/api';
import { useMedia } from './../../utilities/hooks';
import { fullHeightContainer, removeFullHeightContainer } from '../../utilities/helpers';

import { BackButton } from '../BackButton';
import { Event } from '../Event';
import { MyTickets } from './MyTickets';
import { MyTicketsSlider } from './MyTicketsSlider';
import { ActionBtns } from './ActionBtns';
import { TicketModal } from '../TicketModal';
import { useNavigate } from 'react-router-dom';

export default function EventDetailsWrapper({ orderId }) {

    const [order, setOrder] = useState()

    const [
        show,
        setShow
    ] = useState(false);

    const [
        ticketAction,
        setTicketAction
    ] = useState('');

    const [
        ticketStatus,
        setTicketStatus
    ] = useState('');

    let navigate = useNavigate();

    const getMyOrders = () => {
        getOrder(orderId).then((res) => {
            if (res.data.tickets.length === 0) {
                navigate('/my-listings', { replace: true })
                return
            }
            setOrder(res.data)
        }).catch((err) => console.error(err));
    }

    useLayoutEffect(() => {
        const el = document.querySelector('#main-container');
        const body = document.body;

        fullHeightContainer(el);
        body.classList.add('noBodyPadding');

        return () => {
            removeFullHeightContainer(el);
            body.classList.remove('noBodyPadding');
        };
    }, []);

    useEffect(
        () => {
            getMyOrders()
        },
        [
            orderId
        ]
    );

    const handleShow = () => setShow(true);

    const handleClick = (action) => {
        handleShow();
        setTicketAction(action);
    };

    const mediaQuery = useMedia('(max-width: 767px');

    return (
        <section className="spacer-xs full-height-wrapper">
            <div className="section-heading-sm">
                <h1>{mediaQuery ? 'Tickets' : 'Event details'}</h1>
                <BackButton />
            </div>
            <div>
                {mediaQuery ? (
                    <>
                        <MyTicketsSlider order={order} id={orderId} />
                        <ActionBtns handleClick={handleClick} ticketStatus={ticketStatus} />
                    </>
                ) : (
                    <Event event={order?.event} />
                )}
            </div>
            {!mediaQuery && (
                <MyTickets order={order} handleClick={handleClick} ticketStatus={ticketStatus} />
            )}
            <div>
            </div>
            <TicketModal
                ticketAction={ticketAction}
                setTicketStatus={setTicketStatus}
                show={show}
                setShow={setShow}
                order={order}
                getMyOrders={getMyOrders}
            />
        </section>
    );
}
