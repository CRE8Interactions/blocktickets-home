import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';

import { DetailsModal } from './DetailsModal';
import { TransferModal } from './TransferModal';
import { SellModal } from './SellModal';
import { NFTModal } from './NFTModal';

import './ticketModal.scss';

const typeOfCard = (handleShow, ticketStatus, setTicketStatus) => {
	switch (ticketStatus) {
		case 'details':
			return <DetailsModal />;

		case 'transfer':
			return <TransferModal ticket={ticket} order={order} />;

		case 'nft':
			return <NFTModal handleClose={handleClose} />;

		case 'sell':
			return <SellModal handleShow={handleShow} setTicketStatus={setTicketStatus} />;

		case 'delist':
			return <SellModal ticketStatus={ticketStatus} setTicketStatus={setTicketStatus} />;
		default:
			return;
	}
};
export default function TicketModal({ ticketStatus, setTicketStatus }) {
	const [
		show, setShow
	] = useState(true);

	const handleShow = () => setShow(false);

	return (
		<>
		{ show && 
			(<Card id="ticket-modal" className="card-xl card--popup">
			{typeOfCard(handleShow, ticketStatus, setTicketStatus)}
		</Card>
		)}
		</>
	);
}
