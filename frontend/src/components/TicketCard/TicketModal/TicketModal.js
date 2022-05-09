import React from 'react';

import { useWindowSize } from '../../../utilities/hooks';

import Modal from 'react-bootstrap/Modal';

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
export default function TicketModal({ ticketStatus, setTicketStatus, show, setShow}) {

	const windowSize = useWindowSize();

	const handleClose = () => setShow(false);

	return (
		<>
			<Modal show={show} animation={false} fullscreen={'md-down'} scrollable onHide={() => setShow(false)} id="ticket-modal" className={`modal-xl modal--light ${windowSize < 768 && 'modal--popup p-0'}`} centered backdrop={windowSize < 768 ? false : true}>
			{typeOfCard(handleClose, ticketStatus, setTicketStatus)}
		</Modal>
		

		
		</>
	);
}
