import React from "react";

import Card from 'react-bootstrap/Card';

import { OrdersTable } from "./OrdersTable";

export default function Orders() {
    return (
        <section>
            <div className="section-heading">
                <h1>Recent orders</h1>
            </div>
            <Card body>
                <OrdersTable />
            </Card>
        </section>
    )
}