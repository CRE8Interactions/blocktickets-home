import React from 'react';

import { formatOrderId, formatString, formatCurrency } from '../../../utilities/helpers';

export default function TicketRow() {

    return (
        <tr>
            <td>
                {formatOrderId(19331942333743)}
            </td>
            <td>
                Feb 12, 2022 at 3:43pm (EST)
            </td>
            <td className='text-capitalize'>
                Harrison
            </td>
            <td className='text-capitalize'>
                Cogan
            </td>
            <td>
                harrison.cogan@gmail.com
            </td>
            <td>1</td>
            <td className='text-capitalize'>
                Transferred
            </td>
            <td className='text-capitalize'>
                {formatString('general_admission')}
            </td>
            <td className='text-capitalize'>
                Primary
            </td>
            <td>
                {formatCurrency(100)}
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
