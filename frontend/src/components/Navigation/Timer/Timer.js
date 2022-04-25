import React, { useState, useEffect } from 'react';
import * as moment from 'moment';

import { COUNTDOWN_NUM, COUNTDOWN_DURATION } from './../../../utilities/helpers';

import { CheckoutModal } from '../../CheckoutWrapper/Checkout/CheckoutModal';

import './timer.scss';

export default function Timer() {

	const [
		remaining,
		setRemaining
	] = useState();

	const [
		remainingMinutes,
		setRemainingMinutes
	] = useState();

	const [
		remainingSeconds,
		setRemainingSeconds
	] = useState();

	// modal state
		const [
		show,
		setShow
	] = useState(false);

	const [
		modalType,
		setModalType
	] = useState();

	const currentTime = moment().unix();
	const endTime = moment().add(COUNTDOWN_NUM, 'minutes').unix();
	const diffTime = endTime - currentTime;
	let duration = moment.duration(diffTime * COUNTDOWN_DURATION, 'milliseconds');
	const interval = COUNTDOWN_DURATION;

	let time;

	useEffect(() => {
		// time = setInterval(() => {
		// 	duration = moment.duration(duration - interval, 'milliseconds');
		// 	let seconds = duration.seconds();
		// 	if (seconds < 10) {
		// 		seconds = `0${seconds}`;
		// 	}

		// 	setRemaining(`${duration.minutes()}:${seconds}`);
		// 	setRemainingMinutes(duration.minutes())
		// 	setRemainingSeconds(seconds)
		// }, interval);
	}, []);

	const handleShow = () => setShow(true);

	 useEffect(() => {

	// check if timer is halfway every time minute changes 
		if (remainingMinutes == COUNTDOWN_NUM / 2) {
			handleShow();
			setModalType('reminder')
		}
	}, [ remainingMinutes])

	// check if timer is finished every time seconds change  
	useEffect(() => {
	 	  if (remainingMinutes === 0 && remainingSeconds == '00') {
			handleShow();
			setModalType('timeout')
			clearInterval(time);
		}
	}, [remainingSeconds])


	return (
		<>
		<div id="timer-container">
			<div id="timer">
				{remaining &&
				!remaining.includes('-') && (
					<span>
						Session expires in <span id="remaining">{remaining}</span> sec
					</span>
				)}
				{remaining && remaining.includes('-') && <span>Session expired</span>}
			</div>
		</div>

		<CheckoutModal
				modalType={modalType}
				setModalType={setModalType}
				show={show}
				setShow={setShow} />
		</>
	);
}
