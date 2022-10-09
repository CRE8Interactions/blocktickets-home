import React from 'react';

import { CopyButton } from '../../../CopyButton';
import { EditDeleteDropdown } from '../../../EditDeleteDropdown';

export default function TrackingLink({ link, handleShow, hasPermission }) {

    return (
        <div className='flex-row' role="rowgroup">
            <div className='list-table-col' role="cell">
                <span>{link.name}</span>
            </div>
            <div className="list-table-col lg" role="cell">
                <div className="d-flex align-items-center">
                    <div className="text-truncate">
                        <span>{link.url}</span>
                    </div>
                    <CopyButton link={link.url} />
                </div>
            </div>
            <div className="list-table-col" role="cell">
                <span>{link.views}</span>
            </div>
            <div className="list-table-col" role="cell">
                <span>{link.ticketsSold}</span>
            </div>
            <div className="list-table-col" role="cell">
                <span>${link.grossSales}</span>
            </div>
            {!link.default && (
                <div className="list-table-col btn-more-col" role="cell">
                    <EditDeleteDropdown canEdit={false} handleShow={handleShow} hasPermission={hasPermission} />
                </div>
            )}
        </div>
    );
}
