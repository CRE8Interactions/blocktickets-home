import React from 'react';

import { formatCurrency, formatString, capitalizeString } from '../../../utilities/helpers';

export default function TicketRow({ orderId, ticket, ticketBuyer, marketType, type, refund, order }) {
    const ticketType = (ticket) => {
        return ticket?.generalAdmission ? 'General Admission' : 'Seated';
    }
    const orderType = (order) => {
        return 'Standard'
    }
    return (
        <tr>
            <td>
                {capitalizeString(ticketBuyer)}
            </td>
            <td>
                1
            </td>
            <td className='text-capitalize'>
                {marketType}
            </td>
            <td className='text-capitalize'>{orderType(order)}</td>
            <td>
                {formatString(ticketType(ticket))}
            </td>
            <td>
                {formatCurrency((order?.total / order?.details?.ticketCount))}
            </td>
        </tr>
    );
}
