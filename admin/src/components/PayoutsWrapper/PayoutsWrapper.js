import React, { useState, useEffect } from 'react';

import AuthService from '../../utilities/services/auth.service';
import { checkPermission } from '../../utilities/helpers';

import { Payouts } from './Payouts';
import { NoPermissionsContainer } from '../NoPermissionsContainer';

export default function PayoutsWrapper() {

    const { getPermissions } = AuthService;

    const [hasPermission, setHasPermission] = useState();

    // demo purposes: will come from database 
    const payouts = [
        {
            id: 0,
            date: 'Mar 10, 2022',
            status: 'sent',
            price: '880',
            event: 'Nic Fanciulli Live',
            invoice: 1933142333743
        },
        {
            id: 2,
            date: 'Mar 10, 2022',
            status: 'sent',
            price: '880',
            event: 'Nic Fanciulli Live',
            invoice: 1933142333743
        }
    ]


    useEffect(() => {
        setHasPermission(checkPermission(getPermissions(), 11));

    }, [])

    return (
        <div className="position-relative">
            <section className={`wrapper ${!hasPermission ? 'overlay' : ''}`}>
                <header className="section-header">
                    <div className="section-heading section-heading--secondary">
                        <h1>Payouts</h1>
                    </div>
                    <p className='section-header-desc'>Keep track of when your money is being processed or has been sent</p>
                </header>
                <Payouts payouts={payouts} />
            </section>
            {!hasPermission && (
                <NoPermissionsContainer />
            )}
        </div>
    );
}
