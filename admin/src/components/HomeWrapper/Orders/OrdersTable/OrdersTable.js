import React from "react";

import { formatCurrency } from "../../../../utilities/helpers";

import Table from "react-bootstrap/Table";

export default function Orders() {
    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Event</th>
                        <th>Ticket Buyer</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Order Type</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>
                            3170173179
                        </td>
                        <td>
                            Nic Fanciulli presents
                        </td>
                        <td>
                            Harrison Cogan
                        </td>
                        <td>
                            2
                        </td>
                        <td>
                            {formatCurrency(3200)}
                        </td>
                        <td>Mar 27, 2022</td>
                        <td>
                            Primary Ticket
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}