import React from 'react';

import { Reports } from '../Reports';
import { OrdersTable } from '../OrdersTable';

export default function HomeWrapper() {
    return (
        <>
            <Reports />
            <section>
                <div className="section-heading">
                    <h1>Recent orders</h1>
                </div>
                <OrdersTable />
            </section>
        </>
    );
}
