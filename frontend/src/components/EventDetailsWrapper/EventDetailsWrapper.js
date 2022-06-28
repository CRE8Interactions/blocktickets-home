import React, { useLayoutEffect, useEffect, useState } from 'react';

import { getOrder } from '../../utilities/api';
import { useMedia } from './../../utilities/hooks';
import { fullHeightContainer, removeFullHeightContainer, userDevice } from '../../utilities/helpers';

import { BackButton } from '../BackButton';
import { Event } from '../Event';
import { MyTickets } from './MyTickets';
import { MyTicketsSlider } from './MyTicketsSlider';
import { ActionBtns } from './ActionBtns';
import { TicketModal } from '../TicketModal';

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

    const getMyOrders = () => {
        getOrder(orderId).then((res) => {
            setOrder(res.data)
        }).catch((err) => console.error(err));
    }

    const [deviceType, setDeviceType] = useState("");

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
            getMyOrders();
            setDeviceType(userDevice)
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

    return (
        <section className="spacer-xs full-height-wrapper">
            <div className="section-heading-sm">
                <h1>{deviceType && deviceType === 'Mobile' ? 'Tickets' : 'Event details'}</h1>
                <BackButton />
            </div>
            <div>
                {deviceType && deviceType === 'Mobile' ? (
                    <>
                        <MyTicketsSlider order={order} id={orderId} handleClick={handleClick} />
                        <ActionBtns handleClick={handleClick} ticketStatus={ticketStatus} />
                    </>
                ) : (
                    <Event event={order?.event} />
                )}
            </div>
            {deviceType && deviceType === 'Desktop' && (
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
