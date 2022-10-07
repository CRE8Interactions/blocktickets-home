import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { formatDateTime } from '../../../../../utilities/helpers';

export default function InvoiceRow({ invoice }) {
    return (
        <tr>
            <th scope="row">{formatDateTime(moment(invoice?.createdAt))}</th>
            <td>{invoice?.event?.name} - {invoice?.details?.listing ? 'Resale: General Admission' : 'General Admission'}</td>
            <td>{invoice?.details.ticketCount} Tickets</td>
            <td>${parseFloat(invoice?.total).toFixed(2)}</td>
            <td>
                <Link to={'invoice/12'}>Download</Link>
            </td>
        </tr>
    );
}
