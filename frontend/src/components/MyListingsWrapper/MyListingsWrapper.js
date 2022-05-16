import React, { useLayoutEffect, useEffect, useState } from 'react';

import { fullHeightContainer, removeFullHeightContainer } from '../../utilities/helpers';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { MyListingsSlider } from '../Slider/MyListingsSlider';
import { TicketModal } from '../TicketCard/TicketModal';

import { getMyListings, removeMyListings, updateMyListings } from '../../utilities/api';

import './myListingsWrapper.scss';

export default function MyListingsWrapper() {
	const [
		key,
		setKey
	] = useState('active');

	const [
		show,
		setShow
	] = useState(false);

	const [listings, setListings] = useState({})

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
				}
				let active = [];
				let sold = [];
				let expired = [];
				res.data.map(listing => {
					if (listing.status === 'new') types.active.push(listing)
					if (listing.status === 'sold') types.sold.push(listing)
					if (listing.status === 'expired') types.expired.push(listing)
				})
				setListings({
					types
				})				
			})
			.catch((err) => console.error(err))
	}

	const removeListing = (id) => {
		removeMyListings(id)
			.then((res) => myListings())
			.catch((err) => console.error(err))
	}

	useEffect(() => {
		myListings()
	}, [])

	return (
		<section className="spacer-xs" id="my-listings-wrapper">
			<div className="section-heading-sm">
				<h1>My Listings</h1>
				<div className="tablet-desktop-only">
					<SwiperNavigationButtons />
				</div>
			</div>
			<Tabs
				defaultActiveKey="active"
				variant="pills"
				activeKey={key}
				onSelect={(k) => setKey(k)}>
				<Tab eventKey="active" title="Active">
					<MyListingsSlider ticketStatus={'listed'} ticketState={key} listings={listings} removeListing={removeListing}  getListings={myListings} />
				</Tab>
				<Tab eventKey="sold" title="Sold">
					<MyListingsSlider ticketStatus={'listed'} ticketState={key} listings={listings}/>
				</Tab>
				<Tab eventKey="expired" title="Expired">
					<MyListingsSlider ticketStatus={'listed'} ticketState={key} listings={listings} />
				</Tab>
			</Tabs>

			<TicketModal show={show} setShow={setShow} />
		</section>
	);
}
