import React from 'react';

import { EditDeleteDropdown } from '../../../EditDeleteDropdown';

export default function Guest({ guest, handleShow }) {

    return (
        <div className='flex-row' role="rowgroup">
            <div className='list-table-col lg-2' role="cell">
                <span>{guest.name}</span>
            </div>
            <div className="list-table-col lg-2" role="cell">
                <span>{guest.email}</span>
            </div>
            <div className="list-table-col" role="cell">
                <span>{guest.quantity}</span>
            </div>
            <div className="list-table-col" role="cell">
                <span>{guest.ticketType}</span>
            </div>
            <div className="btn-more-col list-table-col" role="cell">
                <EditDeleteDropdown handleShow={handleShow} link={'edit?id=001'} />
            </div>
        </div>
    );
}
