import React, { Fragment } from 'react';

import './seatingMap.scss';
import generalAdmissionsMap from '../../../assets/map-general_admissions.svg';
import seatingMap from '../../../assets/map-seating.svg';

export default function SeatingMap({ styles, type }) {
	return (
		<div className={`map align-items-center justify-content-around ${styles && styles}`}>
			<img
				src={type === 'genAdmission' ? generalAdmissionsMap : seatingMap}
				alt="Seating Map"
			/>
		</div>
	);
}
