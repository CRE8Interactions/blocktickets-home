import React, { useEffect } from 'react';

import { Reports } from '../Reports';
import { OrdersTable } from '../OrdersTable';
import { Cards } from './Cards';

export default function DashboardWrapper({event, orders}) {
    return (
        <div className='max-width-wrapper'>
            <Reports title="dashboard" event={event} orders={orders} />
            <Cards />
            <section>
                <header className="section-header section-heading">
                    <h1>Orders</h1>
                </header>
                <OrdersTable />
            </section>
        </div>
    );
}
