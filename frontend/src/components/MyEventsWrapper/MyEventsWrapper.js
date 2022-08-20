import React, { useRef, useState, useEffect } from 'react';

import { getMyEvents, getIncomingTransfers, acceptIncomingTransfers } from '../../utilities/api';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { MyEventsSlider } from './MyEventsSlider';

export default function MyEventsWrapper() {

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null)

    const [
        orders,
        setOrders
    ] = useState([]);

    const [
        transfers,
        setTransfers
    ] = useState([]);

    const getMyTickets = () => {
        getMyEvents()
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => console.error(err));

        getIncomingTransfers().then((res) => setTransfers(res.data)).catch((err) => console.log(err));
    };

    useEffect(() => {
        getMyTickets();
    }, []);

    const acceptTransfer = (transfer) => {
        let data = {
            transferId: transfer.id
        };
        acceptIncomingTransfers(data).then((res) => getMyTickets()).catch((err) => console.error(err));
    };

    return (
        <section className="spacer-xs">
            <div className="section-heading-sm">
                <h1>My Events</h1>
                <div className="tablet-desktop-only">
                    <SwiperNavigationButtons navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} />
                </div>
            </div>
            <MyEventsSlider navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} orders={orders} transfers={transfers} acceptTransfer={acceptTransfer} />
        </section>
    );
}
