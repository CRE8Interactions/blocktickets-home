import React, { useEffect, useState } from 'react';

import AuthService from '../../utilities/services/auth.service';

import { Reports } from '../Reports';
import { OrdersTable } from '../OrdersTable';
import { Cards } from './Cards';
import { NoPermissionsContainer } from '../NoPermissionsContainer';

export default function DashboardWrapper({ stats, setRange }) {

    const { getPermissions } = AuthService;

    const [hasPermission, setHasPermission] = useState();

    useEffect(() => {
        setHasPermission(getPermissions().organization_permissions.some(permission => permission.name === 'View dashboard'));

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
