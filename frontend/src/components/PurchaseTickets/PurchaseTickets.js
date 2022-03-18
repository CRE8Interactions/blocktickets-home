import React, { Fragment, useState } from 'react';

import { SeatingMap } from './SeatingMap';
import { TicketPurchase } from './TicketPurchase';

import './purchaseTickets.scss';

export default function PurchaseTickets() {
	// 1 - seat selection
	// 2 - ticket quantity
	// 3 - seat confirmation (not for general admissions)
	// 4 - presale

	const steps = {
		selection: 1,
		quantity: 2,
		confirmation: 3,
		presale: 4
	};

	const [
		step,
		setStep
	] = useState('selection');

	const handleClick = (step) => {
		// find key
		setStep(Object.keys(steps).find((key) => key === step));
	};

	const handleGoBack = () => {
		let prevStep = --steps[step];

		// find key based on value
		setStep(Object.keys(steps).find((key) => steps[key] === prevStep));
	};

	return (
		<div className="pt-md-3 flex d-flex flex-column flex-md-row">
			<SeatingMap
				styles={(step === 'quantity' || step === 'presale') && 'tablet-desktop-only--flex'}
			/>

			<TicketPurchase handleClick={handleClick} handleGoBack={handleGoBack} step={step} />
		</div>
	);
}
