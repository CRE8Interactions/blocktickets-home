import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { SeatingMap } from './SeatingMap';
import { TicketPurchase } from './TicketPurchase';

import './purchaseTickets.scss';

export default function PurchaseTickets() {
	// 1 - seat selection
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

	const handleClick = (step, type = '') => {
		// find key
		setStep(Object.keys(steps).find((key) => key === step));

		if (type) setType(type);
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
			/>
		</div>
	);
}
