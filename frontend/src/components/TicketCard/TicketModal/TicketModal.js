import React, { useLayoutEffect} from 'react';

import { useWindowSize } from '../../../utilities/hooks';

import Modal from 'react-bootstrap/Modal';

import { DetailsModal } from './DetailsModal';
import { TransferModal } from './TransferModal';
import { SellModal } from './SellModal';
import { CancelModal } from './CancelModal';
import { RemoveModal } from './RemoveModal';

import './ticketModal.scss';

const type = (handleClose, ticketAction, setTicketStatus) => {
	switch (ticketAction) {
		case 'details':
			return <DetailsModal />;

		case 'transfer':
			return <TransferModal handleClose={handleClose} setTicketStatus={setTicketStatus} />;         

		case 'sell':
			return <SellModal handleClose={handleClose} setTicketStatus={setTicketStatus} />;

		case 'edit':
			return <SellModal handleClose={handleClose}ticketAction={ticketAction} />;

		case 'cancel':
			return <CancelModal handleClose={handleClose} />

		case 'remove':
			return <RemoveModal handleClose={handleClose} />

		
		default:
			return;
	}
};
export default function TicketModal({ ticketAction, setTicketStatus, show, setShow}) {

	const windowSize = useWindowSize();

	const handleClose = () => setShow(false);

	return (
		<>
			<Modal show={show} animation={false}  onHide={() => setShow(false)} id="ticket-modal" className='sticky modal--popup' scrollable centered backdrop={windowSize < 768 ? false : 'static'}>
			{type(handleClose, ticketAction, setTicketStatus)}
		</Modal>
		

		
		</>
	);
}
