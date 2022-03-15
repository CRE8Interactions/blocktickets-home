import React, { Fragment } from 'react';

import './seatingMap.scss';
import generalAdmissionsMap from '../../../assets/map-general_admissions.svg';

export default function SeatingMap({ styles }) {
	return (
		<div className={`map align-items-center justify-content-around ${styles && styles}`}>
			<img src={generalAdmissionsMap} alt="Seating Map" />
		</div>
	);
}
