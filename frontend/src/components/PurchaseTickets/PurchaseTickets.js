import React, { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useMedia } from './../../utilities/hooks';
import { fullHeightContainer, removeFullHeightContainer } from '../../utilities/helpers';

import { SeatingMap } from './SeatingMap';
import { TicketPurchase } from './TicketPurchase';

import './purchaseTickets.scss';

export default function PurchaseTickets() {
	// 1 - ticket selection
	// 2 - ticket confirmation
	// 3 - presale

	const steps = {
		selection: 1,
		confirmation: 2,
		presale: 3
	};

	const { search } = useLocation();

	let query = new URLSearchParams(search, [
		search
	]);

	const [
		param
	] = useState(query.get('type'));

	const [
		step,
		setStep
	] = useState('selection');

	// state when filter menu is open for layout change
	const [
		isFilterOpen,
		setIsFilterOpen
	] = useState(false);

	// better way? - only on seated map
	const [
		isZoomed,
		setIsZoomed
	] = useState(false);

	const [
		ticket,
		setTicket
	] = useState();

	const mediaQuery = useMedia('(min-width: 768px');

	// layout change only in tablet size or if on ticket selection stop and filer menu is closed
	useLayoutEffect(
		() => {
			if (mediaQuery || (step === 'selection' && !isFilterOpen)) {
				const el = document.querySelector('.full-height-wrapper').parentElement;

				fullHeightContainer(el);

				return () => {
					removeFullHeightContainer(el);
				};
			}
		},
		[
			mediaQuery,
			step,
			isFilterOpen
		]
	);

	const handleClick = (step, ticket) => {
		// find key
		setStep(Object.keys(steps).find((key) => key === step));
		setTicket(ticket);
	};

	const handleGoBack = () => {
		let curStep = steps[step];
		const prevStep = --curStep;

		// find key based on value
		setStep(Object.keys(steps).find((key) => steps[key] === prevStep));
	};

	return (
		<div className="pt-md-3 flex d-flex flex-column flex-md-row">
			<SeatingMap
				styles={(step === 'quantity' || step === 'presale') && 'tablet-desktop-only'}
				type={param}
				setIsZoomed={setIsZoomed}
			/>

			<TicketPurchase
				handleClick={handleClick}
				handleGoBack={handleGoBack}
				setIsFilterOpen={setIsFilterOpen}
				isFilterOpen={isFilterOpen}
				step={step}
				type={param}
				isZoomed={isZoomed}
				ticket={ticket}
			/>
		</div>
	);
}
