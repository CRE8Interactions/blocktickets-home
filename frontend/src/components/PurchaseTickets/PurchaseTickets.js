import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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

	// better way? - only on seated map
	const [
		isZoomed,
		setIsZoomed
	] = useState(false);

	const [
		ticket,
		setTicket
	] = useState();

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
				step={step}
				type={param}
				isZoomed={isZoomed}
				ticket={ticket}
			/>
		</div>
	);
}
