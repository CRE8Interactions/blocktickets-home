import React, { Fragment, useState } from 'react';

import Col from 'react-bootstrap/Col';

import { AddOns } from './AddOns';
import { Payment } from './Payment';
import { TotalCard } from './TotalCard';
import { BackButton } from '../../BackButton';
import { CheckoutModal } from './CheckoutModal';

import './checkout.scss';

export default function Checkout({ addOns, setStatus, setOrder, intentId }) {
	// Modal State
	const [
		modalType,
		setModalType
	] = useState();

	const [
		show,
		setShow
	] = useState(false);

	const handleShow = () => setShow(true);

	const handleClick = () => {
		setModalType('leave');
		handleShow();
	};

	const checkValid = (e, name) => {
		let paymentButton = document.getElementById('payment-btn')
		let paymentButtonDisabled = document.getElementById('payment-btn-disabled')

		if (e && e.complete && name && name.split('').length > 5) {
			paymentButton.classList.add('d-block')
			paymentButton.classList.remove('d-none')
			paymentButtonDisabled.classList.add('d-none')
		} else {
			paymentButton.classList.add('d-none')
			paymentButtonDisabled.classList.remove('d-none')
			paymentButtonDisabled.classList.add('d-block')
		}
	}

	return (
		<Fragment>
			<Col md={6}>
				<BackButton marginBottom="4" handleGoBack={handleClick} />
				{addOns.length > 0 && (
					<section id="addOns">
						<AddOns />
					</section>
				)}
				<section>
					<Payment checkValid={checkValid} />
				</section>
			</Col>
			<Col md={6} lg={5} id="total-card">
				<TotalCard
					setStatus={setStatus}
					addOns={addOns}
					setOrder={setOrder}
					intentId={intentId}
				/>
			</Col>
			<CheckoutModal
				modalType={modalType}
				setModalType={setModalType}
				show={show}
				setShow={setShow}
			/>
		</Fragment>
	);
}
