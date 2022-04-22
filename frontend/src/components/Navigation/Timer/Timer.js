import React, { useState, useEffect } from 'react';
import * as moment from 'moment';

import './timer.scss';

export default function Timer() {
	const currentTime = moment().unix()
	const endTime = moment().add(9, 'minutes').unix()
	const diffTime = endTime - currentTime;
	let duration = moment.duration(diffTime * 1000, 'milliseconds');
	const interval = 1000;
	const [remaining, setRemaining] = useState()

	useEffect(() => {
		let time = setInterval(() => {
			duration = moment.duration(duration - interval, 'milliseconds');
			let seconds = duration.seconds()
			if (seconds < 10) {
				seconds = `0${seconds}`
			}
			setRemaining(`${duration.minutes()}:${seconds}`)
		}, interval);
	}, [])
	
	return (
		<div id="timer-container">
			<div id="timer">
				{ remaining && (!remaining.includes('-')) &&
					<span>Session expires in {remaining} sec</span>
				}
				{ remaining && remaining.includes('-') &&
					<span>Session expired</span>
				}
			</div>
		</div>
	);
}
