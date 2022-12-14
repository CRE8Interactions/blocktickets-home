import React from 'react';

import { useWindowSize } from '../../utilities/hooks';

import Modal from 'react-bootstrap/Modal';

import { DetailsModal } from './DetailsModal';
import { TransferModal } from './TransferModal';
import { SellModal } from './SellModal';
import { CancelModal } from './CancelModal';
import { RemoveModal } from './RemoveModal';

import './ticketModal.scss';

const type = (handleClose, ticketAction, setTicketStatus, order, transfer, getMyTransfers, isRemoving, removeListing, listing, getListings) => {
    switch (ticketAction) {
        case 'details':
            return <DetailsModal order={order} />;

        case 'transfer':
            return <TransferModal handleClose={handleClose} setTicketStatus={setTicketStatus} order={order} />;

        case 'sell':
            return <SellModal handleClose={handleClose} setTicketStatus={setTicketStatus} order={order} getListings={getListings} />;

        case 'edit':
            return <SellModal handleClose={handleClose} ticketAction={ticketAction} listing={listing} getListings={getListings} />;

        case 'cancel':
            return <CancelModal handleClose={handleClose} transfer={transfer} getMyTransfers={getMyTransfers} />

        case 'remove':
            return <RemoveModal handleClose={handleClose} isRemoving={isRemoving} removeListing={removeListing} listing={listing} />

        default:
            return;
    }
};
export default function TicketModal({ ticketAction, setTicketStatus, show, setShow, order, transfer, getMyTransfers, isRemoving, removeListing, listing, updateListing, getListings }) {

    const windowSize = useWindowSize();

    const handleClose = () => { setShow(false); location.reload() };

    return (
        <>
            <Modal show={show} animation={false} onHide={() => setShow(false)} id="ticket-modal" className='sticky modal--popup' scrollable centered backdrop={windowSize < 768 ? false : 'static'}>
                {type(handleClose, ticketAction, setTicketStatus, order, transfer, getMyTransfers, isRemoving, removeListing, listing, updateListing, getListings)}
            </Modal>



        </>
    );
}
