import React from "react";

import { formatCurrency, formatOrderId } from "../../utilities/helpers";

import Table from "react-bootstrap/Table";

export default function OrdersTable() {
    return (
        <div className="table-container">
            <Table>
                <thead>
                    <tr>
                        <th>Order</th>
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
                            {formatOrderId(19331942333743)}
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
        </div>
    )
}