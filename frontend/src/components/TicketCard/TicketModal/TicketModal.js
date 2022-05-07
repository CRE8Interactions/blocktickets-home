import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';

import { DetailsModal } from './DetailsModal';
import { TransferModal } from './TransferModal';
import { SellModal } from './SellModal';
import { NFTModal } from './NFTModal';

import './ticketModal.scss';

const typeOfCard = (handleClose, ticketStatus, setTicketStatus) => {
	switch (ticketStatus) {
		case 'details':
			return <DetailsModal />;

		case 'transfer':
			return <TransferModal handleClose={handleClose} setTicketStatus={setTicketStatus} />;

		case 'nft':
			return <NFTModal handleClose={handleClose} />;

		case 'sell':
			return <SellModal handleClose={handleClose} setTicketStatus={setTicketStatus} />;

		case 'delist':
			return <SellModal ticketStatus={ticketStatus} setTicketStatus={setTicketStatus} />;
		default:
			return;
	}
};
export default function TicketModal({ ticketStatus, setTicketStatus, setShow}) {

	const handleClose = () => setShow(false)

	return (
		<>
		
			<Card id="ticket-modal" className="card-xl card--popup">
			{typeOfCard(handleClose, ticketStatus, setTicketStatus)}
		</Card>
		
		</>
	);
}
