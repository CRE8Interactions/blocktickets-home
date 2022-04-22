import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { VenueInformation } from '../../components';
import { getVenue } from '../../utilities/api';

export default function VenuePage() {
	let { id } = useParams();
	const [
		venue,
		setVenue
	] = useState();

	useEffect(
		() => {
			getVenue(id).then((res) => setVenue(res.data)).catch((err) => console.error(err));
		},
		[
			id
		]
	);

	return (
		<Fragment>
			<section>
				<VenueInformation venue={venue} />
			</section>
		</Fragment>
	);
}
