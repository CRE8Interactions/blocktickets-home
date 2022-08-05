import React from 'react';

import { CopyButton } from '../../../CopyButton';
import { EditDeleteDropdown } from '../../../EditDeleteDropdown';

export default function TrackingLink({ link, handleShow }) {

    return (
        <div className='flex-row' role="rowgroup">
            <div className='list-table-col lg' role="cell">
                <span>{link.name}</span>
            </div>
            <div className="list-table-col lg-2 text-truncate" role="cell">
                <span>{link.url}</span>
            </div>
            <CopyButton link={link.url} />
            <div className="list-table-col" role="cell">
                <span>{link.views}</span>
            </div>
            <div className="list-table-col" role="cell">
                <span>{link.ticketsSold}</span>
            </div>
            <div className="list-table-col" role="cell">
                <span>{link.grossSales}</span>
            </div>
            {!link.default && (
                <div className="btn-more-col list-table-col" role="cell">
                    <EditDeleteDropdown handleShow={handleShow} link={'edit?id=001'} />
                </div>
            )}
        </div>
    );
}
