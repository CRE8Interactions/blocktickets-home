import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';

import { getMyListings, removeMyListings } from '../../utilities/api';
import { fullHeightContainer, removeFullHeightContainer } from '../../utilities/helpers';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { EmptyContainer } from "./../EmptyContainer";
import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { MyListingsSlider } from './MyListingsSlider';

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
    ] = useState({});

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
            })
            .catch((err) => console.error(err));
    };

    const removeListing = (id) => {
        removeMyListings(id).then((res) => myListings()).catch((err) => console.error(err));
    };

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
                    {listings.length > 0 ? (
                        <MyListingsSlider
                            navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef}
                            ticketStatus={'listed'}
                            ticketState={key}
                            listings={listings.active}
                            removeListing={removeListing}
                            getListings={myListings}
                        />
                    ) : (
                        <EmptyContainer>
                            <h1>You do not have any {key} listings</h1>
                            <h2 className="subtitle">Once your ticket listing is {key}, your details will be available here</h2>
                        </EmptyContainer>
                    )}
                </Tab>
                <Tab eventKey="sold" title="Sold" key={new Date().getTime() + 1}>
                    {listings.length > 0 ? (
                        <MyListingsSlider
                            navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef}
                            ticketStatus={'listed'}
                            ticketState={key}
                            listings={listings.sold}
                        />
                    ) : (
                        <EmptyContainer>
                            <h1>You do not have any {key} listings</h1>
                            <h2 className="subtitle">Once your ticket listing is {key}, your details will be available here</h2>
                        </EmptyContainer>
                    )}
                </Tab>
                <Tab eventKey="expired" title="Expired" key={new Date().getTime() + 2}>
                    {listings.length > 0 ? (
                        <MyListingsSlider
                            ticketStatus={'listed'}
                            ticketState={key}
                            listings={listings.expired}
                        />
                    ) : (
                        <EmptyContainer>
                            <h1>You do not have any {key} listings</h1>
                            <h2 className="subtitle">Once your ticket listing is {key}, your details will be available here</h2>
                        </EmptyContainer>
                    )}
                </Tab>
            </Tabs>
        </section>
    );
}
