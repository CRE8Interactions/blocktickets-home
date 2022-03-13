import React, { Fragment } from 'react';

import './seatingMap.scss';
import generalAdmissionsMap from '../../../assets/map-general_admissions.svg';

export default function SeatingMap({ styles }) {
	return (
		<div className="map d-flex align-items-center justify-content-around">
			<img src={generalAdmissionsMap} className={styles} alt="Seating Map" />
		</div>
	);
}
