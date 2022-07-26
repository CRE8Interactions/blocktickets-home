import React from 'react';

import { EditDeleteDropdown } from '../../../EditDeleteDropdown';

export default function MessageRow({ contact, handleShow, show }) {

    return (
        <tr>
            <td>
                {contact.emailText}
            </td>
            <td>
                {contact.recipients}
            </td>
            <td>
                {contact.date}
            </td>
            {show && (
                <td className="btn-more">
                    <EditDeleteDropdown handleShow={handleShow} link={'edit?id=001'} />
                </td>
            )}
        </tr>
    );
}
