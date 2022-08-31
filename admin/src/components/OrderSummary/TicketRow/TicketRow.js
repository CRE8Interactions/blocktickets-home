import React from 'react';
import { LinkContainer } from "react-router-bootstrap";

import { formatCurrency, formatString, capitalizeString } from '../../../utilities/helpers';

import Dropdown from 'react-bootstrap/Dropdown';

import { MoreIcon } from '../../MoreIcon';

export default function TicketRow({ orderId, ticketBuyer, marketType, type, ticket, show = true, refund, order }) {
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
            {show && (
                <td className="btn-more">
                    <Dropdown align="right">
                        <Dropdown.Toggle variant="default">
                            <MoreIcon />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <ul>
                                {!refund && (
                                    <li>
                                        <LinkContainer to={`refund?order=${orderId}&ticket=${ticket.id}`}>
                                            <Dropdown.Item className="btn-refund">
                                                Refund ticket
                                            </Dropdown.Item>
                                        </LinkContainer>
                                    </li>
                                )}
                                <li>
                                    <LinkContainer to={`attendees-report?order=${orderId}&ticket=${ticket.id}`}>
                                        <Dropdown.Item className="btn-view">
                                            View attendees report
                                        </Dropdown.Item>
                                    </LinkContainer>
                                </li>
                            </ul>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            )}
        </tr>
    );
}
