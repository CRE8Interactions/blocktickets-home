import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

import { IconButton } from '../../IconButton';
import twitter from '../../../assets/icons/twitter.svg';
import instagram from '../../../assets/icons/instagram.svg';
import facebook from '../../../assets/icons/facebook.svg';

import './venueCard.scss';

export default function VenueCard() {
	return (
		<Card body className="card--light text-center d-flex flex-column">
			<Card.Img className="rounded-circle" width="160" height="160" />
			<Card.Title as="h5" className="fs-md">
				CODA venue with a long long name
			</Card.Title>
			<Card.Subtitle as="p" className="fs-md">
				12345 Fifth Ave, New York NY United States
			</Card.Subtitle>
			<Card.Text className="caption text-muted">
				A short / long description of the venue goes there. This can be extended to a 5-10
				rows of text
			</Card.Text>
			<Stack direction="horizontal" className="justify-content-center my-4">
				<IconButton link="" variant="primary" btn="location" styles="mt-0">
					Location
				</IconButton>
				<IconButton variant="outline-light" styles="btn--icon-lg" background="save" />
				<IconButton variant="outline-light" styles="btn--icon-lg" background="website" />
			</Stack>
			<Stack direction="horizontal" className="my-4 justify-content-center" gap={3}>
				<img src={twitter} alt="" />
				<img src={instagram} alt="" />
				<img src={facebook} alt="" />
			</Stack>
			<Stack />
			<Card.Footer>
				<span className="caption text-muted">179 Streamed shows</span>
			</Card.Footer>
		</Card>
	);
}
