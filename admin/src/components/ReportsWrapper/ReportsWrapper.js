import React from 'react';

import { Reports } from '../Reports';
import { OrdersTable } from '../OrdersTable';

export default function ReportsWrapper() {
    return (
        <>
            <Reports />
            <section>
                <header className="section-header section-heading">
                    <h1>Recent orders</h1>
                </header>
                <OrdersTable />
            </section>
        </>
    );
}
