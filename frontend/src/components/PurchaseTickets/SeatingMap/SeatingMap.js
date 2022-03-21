import React, { Fragment } from 'react';

import './seatingMap.scss';
import generalAdmissionsMap from '../../../assets/map-general_admissions.svg';

export default function SeatingMap({ styles, type }) {
	return (
		<div className={`map align-items-center justify-content-around ${styles && styles}`}>
			<img
				src={
					type === 'genAdmissions' ? (
						generalAdmissionsMap
					) : (
						'//mapsapi.tmol.io/maps/geometry/image/25/46/254607?removeFilters=ISM_Shadow&avertaFonts=true&app=CCP'
					)
				}
				alt="Seating Map"
			/>
		</div>
	);
}
