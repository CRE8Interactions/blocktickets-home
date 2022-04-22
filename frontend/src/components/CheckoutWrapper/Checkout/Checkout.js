import React, { Fragment, useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';

import { AddOns } from './AddOns';
import { Payment } from './Payment';
import { TotalCard } from './TotalCard';
import { BackButton } from '../../BackButton';
import { CheckoutModal } from './CheckoutModal';

import { COUNTDOWN_NUM, COUNTDOWN_DURATION } from '../../../utilities/helpers';

import './checkout.scss';

export default function Checkout({ addOns, setStatus, setOrder, intentId }) {

	// Timer State
	const [
		remainingMinutes,
		setRemainingMinutes
	] = useState();

	const [
		remainingSeconds,
		setRemainingSeconds
	] = useState();

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

		// get the remaining time from timer 
	  const getRemainingTime = () => {
		return document.getElementById('remaining')?.innerHTML;
			}
			
			if (getRemainingTime()) {
		setTimeout(() => {
			if (getRemainingTime()) {
		const [minutes, seconds ] = getRemainingTime()?.split(":");

		setRemainingMinutes(minutes); 
		setRemainingSeconds(seconds)
			}
		}, COUNTDOWN_DURATION);
	} 
	if (!getRemainingTime() || remainingSeconds == '00') {
		console.log('out of time');
	}

	useEffect(() => {

		// check if timer is halfway every time minute changes 
		if (remainingMinutes == COUNTDOWN_NUM / 2) {
			handleShow();
			setModalType('reminder')
		}

	}, [ remainingMinutes])

	// check if timer is finished every time seconds change  
	useEffect(() => {
	 	  if (!getRemainingTime()) {
			handleShow();
			setModalType('timeout')
		}
	}, [remainingSeconds])
	

	const handleClick = () => {
		setModalType('leave');
		handleShow()
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
				<section><Payment /></section>
			</Col>
			<Col md={6} lg={5} id="total-card">
				<TotalCard setStatus={setStatus} addOns={addOns} setOrder={setOrder} intentId={intentId} />
			</Col>
			<CheckoutModal modalType={modalType} setModalType={setModalType} show={show} setShow={setShow} />
		</Fragment>
	);
}
