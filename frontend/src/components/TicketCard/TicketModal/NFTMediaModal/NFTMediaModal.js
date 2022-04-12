import React, { useLayoutEffect } from 'react';

import Button from 'react-bootstrap/Button';

import nft from '../../../../assets/nft_art.jpg';

import './nftMediaModal.scss';

export default function NFTMediaModal({ handleClose }) {
	useLayoutEffect(() => {
		document.querySelector('.modal-content').classList.add('popup');

		return () => {
			document.querySelector('.modal-content').classList.remove('popup');
		};
	}, []);

	return (
		<div id="nft-media">
			<Button aria-label="Close" variant="default" onClick={handleClose} />
			<img src={nft} width="420" height="420" alt="NFT Media" className="rounded-lg" />
		</div>
	);
}
