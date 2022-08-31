import React from 'react';
import Image from 'react-bootstrap/esm/Image';

import './venueBanner.scss';

export default function VenueBanner({ venue }) {
	console.log(venue)
	const imgStyle = {
		width: '100vw',
		height: '300px'
	}
	return (
		<header className="jumbotron">
			<Image src={venue?.banner?.url} style={imgStyle} />
		</header>
	);
}
