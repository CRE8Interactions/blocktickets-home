import React from 'react';

import { EditDeleteDropdown } from '../../../EditDeleteDropdown';

export default function Guest({ guest, handleShow }) {
    return (
        <div className='flex-row' role="rowgroup">
            <div className='list-table-col ' role="cell">
                <span>{guest.firstName}</span>
            </div>
            <div className='list-table-col ' role="cell">
                <span>{guest.lastName}</span>
            </div>
            <div className="list-table-col " role="cell">
                <span>{guest.phoneNumber}</span>
            </div>
            <div className="list-table-col" role="cell">
                <span>{guest.quantity}</span>
            </div>
            <div className="list-table-col" role="cell">
                <span>{guest.ticketType}</span>
            </div>
            <div className="btn-more-col" role="cell">
                <EditDeleteDropdown canEdit={false} handleShow={(e) => handleShow(guest.id)} />
            </div>
        </div>
    );
}
