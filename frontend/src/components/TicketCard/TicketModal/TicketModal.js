import React, { useLayoutEffect} from 'react';

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

	useLayoutEffect(() => {
		const el = document.querySelector('body');
		if(el) {
	  el.classList.add('noBodyPadding');
		}
	
	}, [ show ])

	const handleClose = () => setShow(false);

	return (
		<>
			<Modal show={show} animation={false}  onHide={() => setShow(false)} id="ticket-modal" className='sticky modal--popup' scrollable centered backdrop={windowSize < 768 ? false : 'static'}>
			{typeOfCard(handleClose, ticketStatus, setTicketStatus)}
		</Modal>
		

		
		</>
	);
}
