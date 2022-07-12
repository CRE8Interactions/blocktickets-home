import React from 'react';
import { LinkContainer } from "react-router-bootstrap";

import { formatCurrency, formatString, capitalizeString } from '../../../utilities/helpers';

import Dropdown from 'react-bootstrap/Dropdown';

import { MoreIcon } from '../../MoreIcon';

export default function TicketRow({ orderId, ticketBuyer, marketType, type, ticket, show = true }) {

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
            <td className='text-capitalize'>{ticket.status}</td>
            <td>
                {formatString(type)}
            </td>
            <td>
                {formatCurrency(45.50)}
            </td>
            {show && (
                <td className="btn-more">
                    <Dropdown align="right">
                        <Dropdown.Toggle variant="default">
                            <MoreIcon />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <ul>
                                <li>
                                    <LinkContainer to={`refund?order=${orderId}&ticket=${ticket.id}`}>
                                        <Dropdown.Item className="btn-edit">
                                            Refund ticket
                                        </Dropdown.Item>
                                    </LinkContainer>
                                </li>
                                <li>
                                    <LinkContainer to={`attendee-report`}>
                                        <Dropdown.Item className="btn-edit">
                                            View attendee report
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
