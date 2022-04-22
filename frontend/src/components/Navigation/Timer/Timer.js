import React, { useState, useEffect } from 'react';
import * as moment from 'moment';

import { COUNTDOWN_NUM, COUNTDOWN_DURATION } from './../../../utilities/helpers';

import './timer.scss';

export default function Timer() {
	const [
		remaining,
		setRemaining
	] = useState();

	const currentTime = moment().unix();
	const endTime = moment().add(COUNTDOWN_NUM, 'minutes').unix();
	const diffTime = endTime - currentTime;
	let duration = moment.duration(diffTime * COUNTDOWN_DURATION, 'milliseconds');
	const interval = COUNTDOWN_DURATION;

	useEffect(() => {
		let time = setInterval(() => {
			duration = moment.duration(duration - interval, 'milliseconds');
			let seconds = duration.seconds();
			if (seconds < 10) {
				seconds = `0${seconds}`;
			}

			setRemaining(`${duration.minutes()}:${seconds}`);
		}, interval);
	}, []);

	return (
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
	);
}
