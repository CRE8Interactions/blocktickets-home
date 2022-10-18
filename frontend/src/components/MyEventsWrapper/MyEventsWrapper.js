import React, { useRef, useState, useEffect } from 'react';

import { getMyEvents, getIncomingTransfers, acceptIncomingTransfers, getGuestList } from '../../utilities/api';

import { EmptyContainer } from '../EmptyContainer';
import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { MyEventsSlider } from './MyEventsSlider';
import authService from '../../utilities/services/auth.service';

export default function MyEventsWrapper() {

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const { getUser } = authService;
    const user = getUser().user;

    const [
        orders,
        setOrders
    ] = useState([]);

    const [
        transfers,
        setTransfers
    ] = useState([]);

    const [isAccepting, setIsAccepting] = useState(false)

    const [
        guestLists,
        setGuestLists
    ] = useState([]);

    const getMyTickets = () => {
        getMyEvents()
            .then((res) => {
                setOrders(res.data);
                setIsAccepting(false)
            })
            .catch((err) => console.error(err));

        getIncomingTransfers().then((res) => setTransfers(res.data)).catch((err) => console.log(err));

        getGuestList(encodeURIComponent(user?.phoneNumber))
            .then((res) => setGuestLists(res.data))
            .catch((err) => console.error(err))
    };

    useEffect(() => {
        getMyTickets();
    }, []);

    const acceptTransfer = (transfer) => {
        setIsAccepting(true)
        let data = {
            transferId: transfer.id
        };
        acceptIncomingTransfers(data).then((res) => {
            getMyTickets()
        }).catch((err) => {
            console.error(err)
            setIsAccepting(false)
        });
    };

    return (
        <section className="spacer-xs">
            <div className="section-heading-sm">
                <h1>My events</h1>
                <div className="tablet-desktop-only">
                    <SwiperNavigationButtons navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} />
                </div>
            </div>
            {orders?.filter(order => order.event !== null).length > 0 || guestLists.length > 0 ? (
                <MyEventsSlider navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} orders={orders} transfers={transfers} acceptTransfer={acceptTransfer}
                    isAccepting={isAccepting} guestLists={guestLists} />
            ) : (
                <EmptyContainer>
                    <h1>You do not have any events</h1>
                </EmptyContainer>
            )}
        </section>
    );
}
