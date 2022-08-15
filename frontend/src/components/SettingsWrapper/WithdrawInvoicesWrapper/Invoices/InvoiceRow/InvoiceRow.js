import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function InvoiceRow({ invoice }) {
    return (
        <tr>
            <th scope="row">{moment(invoice?.createdAt).format('M.DD.YYYY')}</th>
            <td>{invoice?.event?.name} !!! - {invoice?.details?.listing ? 'Resale: General Admission' : 'General Admission'}</td>
            <td>{invoice?.details.ticketCount} Tickets</td>
            <td>${parseFloat(invoice?.total).toFixed(2)}</td>
            <td>
                <Link to={'invoice/12'}>Download</Link>
            </td>
        </tr>
    );
}
