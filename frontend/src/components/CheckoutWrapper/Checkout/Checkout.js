import React, { Fragment, useState } from 'react';

import Col from 'react-bootstrap/Col';

import { useMedia } from './../../../utilities/hooks';

import { OrderPreview } from './OrderPreview';
import { AddOns } from './AddOns';
import { Payment } from './Payment';
import { TotalCard } from './TotalCard';
import { BackButton } from '../../BackButton';
import { CheckoutModal } from './CheckoutModal';

import './checkout.scss';

export default function Checkout({ addOns, setStatus, setOrder, intentId }) {
	let order = sessionStorage.getItem('order');
	if (order) order = JSON.parse(order);

	const mobileMediaQuery = useMedia('(max-width: 767px)');
	const tabletDesktopMediaQuery = useMedia('(min-width: 768px)');

	// Modal State
	const [
		modalType,
		setModalType
	] = useState();

	const [
		modalError,
		setModalError
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

	const paymentDeclined = (err) => {
		setModalType('declined');
		setModalError(err);
		handleShow();
	};

	const checkValid = (e) => {
		let paymentButton = document.getElementById('payment-btn');
		let paymentButtonDisabled = document.getElementById('payment-btn-disabled');

		if (e && e.complete) {
			paymentButton.classList.add('d-block');
			paymentButton.classList.remove('d-none');
			paymentButtonDisabled.classList.add('d-none');
		}
		else {
			paymentButton.classList.add('d-none');
			paymentButtonDisabled.classList.remove('d-none');
			paymentButtonDisabled.classList.add('d-block');
		}
	};

	return (
		<Fragment>
			<Col md={6}>
				<BackButton marginBottom="4" handleGoBack={handleClick} />
				{mobileMediaQuery && (
					<div id="order-ticket">
						<OrderPreview />
					</div>
				)}
				{addOns.length > 0 && (
					<section id="addOns">
						<AddOns />
					</section>
				)}

				<section>
					<Payment checkValid={checkValid} />
				</section>
			</Col>
			<Col md={6} lg={5} className="sticky">
				{tabletDesktopMediaQuery && (
					<Col className="mb-3">
						<OrderPreview />
					</Col>
				)}

				<Col>
					<TotalCard
						setStatus={setStatus}
						addOns={addOns}
						setOrder={setOrder}
						intentId={intentId}
						paymentDeclined={paymentDeclined}
					/>
				</Col>
			</Col>

			<CheckoutModal
				modalType={modalType}
				setModalType={setModalType}
				show={show}
				setShow={setShow}
				modalError={modalError}
			/>
		</Fragment>
	);
}
