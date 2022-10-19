import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';

import { getMyListings, removeMyListings } from '../../utilities/api';
import { fullHeightContainer, removeFullHeightContainer } from '../../utilities/helpers';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { EmptyContainer } from "./../EmptyContainer";
import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { MyListingsSlider } from './MyListingsSlider';
import { TicketModal } from '../TicketModal';

import './myListingsWrapper.scss';

export default function MyListingsWrapper() {

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null)

    const [
        key,
        setKey
    ] = useState('active');

    const [
        listings,
        setListings
    ] = useState();

    const [listing, setListing] = useState()

    const [
        show,
        setShow
    ] = useState(false);

    const [ticketAction, setTicketAction] = useState();

    const [isRemoving, setIsRemoving] = useState(false)

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

    const handleClick = (action, listing) => {
        setListing(listing);
        handleShow();
        setTicketAction(action);
    };

    const myListings = () => {
        getMyListings()
            .then((res) => {
                let types = {
                    active: [],
                    sold: [],
                    expired: []
                };

                res.data.map((listing) => {

                    if (listing.status === 'new' && listing.event !== null) types.active.push(listing);
                    if (listing.status === 'complete') types.sold.push(listing);
                    if (listing.status === 'expired') types.expired.push(listing);
                });
                setListings(types);
                setIsRemoving(false)
            })
            .catch((err) => console.error(err));
    };

    const removeListing = (id) => {
        return new Promise((resolve, reject) => {
            setIsRemoving(true)
            removeMyListings(id).then((res) => {
                myListings()
                resolve()
            }).catch((err) => {
                console.error(err)
                setIsRemoving(false)
                reject()
            });
        });
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        myListings();
    }, []);

    return (
        <section className="spacer-xs" id="my-listings-wrapper">
            <div className="section-heading-sm">
                <h1>My listings</h1>
                <div className="tablet-desktop-only">
                    <SwiperNavigationButtons navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} />
                </div>
            </div>
            <Tabs defaultActiveKey="active" variant="pills" activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="active" title="Active" key={new Date().getTime()}>
                    {listings?.active.length > 0 ? (
                        <MyListingsSlider
                            navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef}
                            ticketStatus={'listed'}
                            ticketState={key}
                            listings={listings.active}
                            handleClick={handleClick}
                            setTicketAction={setTicketAction}
                        />
                    ) : (
                        <EmptyContainer>
                            <h1>You do not have any {key} listings</h1>
                            <h2 className="subtitle">Once your ticket listing is {key}, your details will be available here</h2>
                        </EmptyContainer>
                    )}
                </Tab>
                <Tab eventKey="sold" title="Sold" key={new Date().getTime() + 1}>
                    {listings?.sold.length > 0 ? (
                        <MyListingsSlider
                            navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef}
                            ticketStatus={'listed'}
                            ticketState={key}
                            listings={listings.sold}
                            handleClick={handleClick}
                            setTicketAction={setTicketAction}
                        />
                    ) : (
                        <EmptyContainer>
                            <h1>You do not have any {key} listings</h1>
                            <h2 className="subtitle">Once your ticket listing is {key}, your details will be available here</h2>
                        </EmptyContainer>
                    )}
                </Tab>
                <Tab eventKey="expired" title="Expired" key={new Date().getTime() + 2}>
                    {listings?.expired.length > 0 ? (
                        <MyListingsSlider
                            ticketStatus={'listed'}
                            ticketState={key}
                            listings={listings.expired}
                            handleClick={handleClick}
                            setTicketAction={setTicketAction}
                        />
                    ) : (
                        <EmptyContainer>
                            <h1>You do not have any {key} listings</h1>
                            <h2 className="subtitle">Once your ticket listing is {key}, your details will be available here</h2>
                        </EmptyContainer>
                    )}
                </Tab>
            </Tabs>
            <TicketModal
                listing={listing}
                order={listing}
                removeListing={removeListing}
                ticketAction={ticketAction}
                show={show}
                setShow={setShow}
                isRemoving={isRemoving}
            />
        </section>
    );
}
