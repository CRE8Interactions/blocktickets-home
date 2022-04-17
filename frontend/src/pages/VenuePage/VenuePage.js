import React, { Fragment, useEffect, useState } from 'react';

import { VenueInformation } from '../../components';
import { useParams } from "react-router-dom";
import { getVenue } from '../../utilities/api';

import './venues.scss';

export default function VenuePage() {
	let { id } = useParams();
	const [venue, setVenue] = useState()

	useEffect(() => {
		getVenue(id)
			.then((res => setVenue(res.data)))
			.catch((err) => console.error(err))
	}, [id])

	return (
		<Fragment>
			<header className="jumbotron text-center">
				<h1>BG</h1>
			</header>
			<section className="spacer-xs">
				<VenueInformation venue={venue} />
			</section>
		</Fragment>
	);
}
