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
                <header className="section-header section-heading">
                    <h1>Orders</h1>
                </header>
                <OrdersTable />
            </section>
        </>
    );
}
