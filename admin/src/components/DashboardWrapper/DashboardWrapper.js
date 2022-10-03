import React, { useEffect, useState } from 'react';

import AuthService from '../../utilities/services/auth.service';
import { checkPermission } from '../../utilities/helpers';

import { Reports } from '../Reports';
import { OrdersTable } from '../OrdersTable';
import { Cards } from './Cards';
import { NoPermissionsContainer } from '../NoPermissionsContainer';

export default function DashboardWrapper({ stats, setRange }) {
    console.log(stats)
    const { getPermissions } = AuthService;

    const [hasPermission, setHasPermission] = useState();

    useEffect(() => {
        setHasPermission(checkPermission(getPermissions(), 2));

    }, [])

    return (
        <>
            <div className="position-relative">
                <div className={`max-width-wrapper ${!hasPermission ? 'overlay' : ''}`}>
                    <Reports title="dashboard" stats={stats} setRange={setRange} />
                    <Cards stats={stats} />
                    {/* <section>
                    <header className="section-header section-heading">
                    <h1>Orders</h1>
                    </header>
                    <OrdersTable />
                </section> */}
                </div>
                {!hasPermission && (
                    <NoPermissionsContainer />
                )}
            </div>
        </>
    );
}
