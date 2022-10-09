import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getVenue } from '../../utilities/api';

import { VenueInformation } from '../../components';

export default function VenuePage() {
	let { id } = useParams();
	const [
		venue,
		setVenue
	] = useState();

	useEffect(() => {
			getVenue(Number(id))
			.then((res) => {
				setVenue(res.data?.find((venue) => venue.id == Number(id)))}
			).catch((err) => console.error(err));
	},[id]);

	return (
		<Fragment>
			<section>
				<VenueInformation venue={venue} />
			</section>
		</Fragment>
	);
}
