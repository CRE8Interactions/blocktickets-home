import React from 'react';
import moment from 'moment';

import { formatString, formatCurrency } from '../../../utilities/helpers';

import Table from 'react-bootstrap/Table'

export default function Attendees({ attendees }) {

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
                    {attendees && attendees?.map((attendee, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {attendee.orderId}
                                </td>
                                <td>
                                    {moment(attendee.processedAt).format('MMM DD, YYYY')} at {moment(attendee.processedAt).format('h:mma')} (EST)
                                </td>
                                <td className='text-capitalize'>
                                    {attendee.users_permissions_user.firstName}
                                </td>
                                <td className='text-capitalize'>
                                    {attendee.users_permissions_user.lastName}
                                </td>
                                <td>
                                    {attendee.users_permissions_user.email}
                                </td>
                                <td>{attendee.details.ticketCount}</td>
                                <td className='text-capitalize'>
                                    {attendee.type === 'resale' ? 'Transfer' : 'Purchase'}
                                </td>
                                <td className='text-capitalize'>
                                    {formatString('general_admission')}
                                </td>
                                <td className='text-capitalize'>
                                    {attendee.type === 'resale' ? 'Secondary' : 'Primary'}
                                </td>
                                <td>
                                    {formatCurrency(attendee.total)}
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
                                <td>{attendee?.intentDetails?.charges.data[0]?.payment_method_details.card.brand}</td>
                                <td>{attendee?.intentDetails?.charges.data[0]?.payment_method_details.card.last4}</td>
                                <td>United States</td>
                                <td>Lewisville</td>
                                <td>Texas</td>
                                <td>75057</td>
                                <td>Male</td>
                                <td>24</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}
