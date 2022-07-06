import React from "react";

import { formatCurrency } from "../../utilities/helpers";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

export default function OrdersTable() {
    return (
        <Card body>
            <Table>
                <thead>
                    <tr>
                        <th>Order</th>
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
                            1933-194233-3743
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
        </Card>
    )
}