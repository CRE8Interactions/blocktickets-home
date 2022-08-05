import React from 'react';

import { formatString } from '../../../../utilities/helpers';

import { EditDeleteDropdown } from '../../../EditDeleteDropdown';

export default function Recipient({ attendee, handleShow }) {

    return (
        <div className='flex-row' role="rowgroup">
            <div className='list-table-col lg' role="cell">
                {formatString(attendee.name)}
            </div>
            <div className='list-table-col lg' role="cell">
                {attendee.email}
            </div>
            <div className="btn-more-col list-table-col" role="cell">
                <EditDeleteDropdown handleShow={handleShow} link={'edit?id=001'} />
            </div>
        </div>
    );
}
