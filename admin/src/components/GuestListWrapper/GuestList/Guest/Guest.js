import React from 'react';

import { formatPhoneNumber } from '../../../../utilities/helpers';

import { EditDeleteDropdown } from '../../../EditDeleteDropdown';

export default function Guest({ guest, handleShow }) {

    return (
        <tr>
            <td>
                {guest.firstName}
            </td>
            <td>
                {guest.lastName}
            </td>
            <td>{formatPhoneNumber(guest.phoneNumber)}
            </td>
            <td>{guest.quantity}
            </td>
            <td>
                {guest.ticketType}
            </td>
            <td>
                Pending
            </td>
            <td className="btn-more">
                <EditDeleteDropdown handleShow={handleShow} link={'edit?id=001'} />
            </td>
        </tr>
    );
}
