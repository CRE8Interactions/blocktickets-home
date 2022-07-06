import React from 'react';

import { Reports } from '../Reports';
import { OrdersTable } from '../OrdersTable';
import { Cards } from './Cards';

export default function DashboardWrapper() {
    return (
        <>
            <Reports title="dashboard" />
            <Cards />
            <section>
                <div className="section-heading">
                    <h1>Orders</h1>
                </div>
                <OrdersTable />
            </section>
        </>
    );
}
