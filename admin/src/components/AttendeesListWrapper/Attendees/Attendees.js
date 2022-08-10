import React from 'react';

import { formatOrderId, formatString, formatCurrency } from '../../../utilities/helpers';

import Table from 'react-bootstrap/Table'

export default function Attendees() {

    return (
        <div className="full-width-table table-container">
            <Table className='table-lg'>
                <thead>
                    <tr>
                        <th>Order</th>
                        <th>Order date</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Quantity</th>
                        <th>Transaction type</th>
                        <th>Ticket type</th>
                        <th>Market type</th>
                        <th>Paid</th>
                        <th>Service fees</th>
                        <th>Facility fee</th>
                        <th>Payment processing fee</th>
                        <th>Tax</th>
                        <th>Attendee status</th>
                        <th>Payment method</th>
                        <th>Last 4 digits</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip code</th>
                        <th>Gender</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </Table>
        </div>
    );
}
