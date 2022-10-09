import React from 'react';

import { formatOrderId, formatString, formatCurrency } from '../../../utilities/helpers';

export default function AttendeeRow({ orderId, firstName, lastName, marketType, type, ticket }) {

    return (
        <tr>
            <td>
                {formatOrderId(orderId)}
            </td>
            <td>
                Feb 12, 2022 at 3:43pm (EST)
            </td>
            <td className='text-capitalize'>
                {firstName}
            </td>
            <td className='text-capitalize'>
                {lastName}
            </td>
            <td>
                harrison.cogan@gmail.com
            </td>
            <td>1</td>
            <td className='text-capitalize'>
                {ticket.status}
            </td>
            <td className='text-capitalize'>
                {formatString(type)}
            </td>
            <td className='text-capitalize'>
                {marketType}
            </td>
            <td>
                {formatCurrency(ticket.price)}
            </td>
            <td>
                {formatCurrency(20)}
            </td>
            <td>
                {formatCurrency(2)}
            </td>
            <td>
                {formatCurrency(20)}
            </td>
            <td>
                {formatCurrency(4)}
            </td>
            <td>
                Attending
            </td>
            <td>Visa</td>
            <td>1245</td>
            <td>United States</td>
            <td>Lewisville</td>
            <td>Texas</td>
            <td>75057</td>
            <td>Male</td>
            <td>24</td>
        </tr>
    );
}
