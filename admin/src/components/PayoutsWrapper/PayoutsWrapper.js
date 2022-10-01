import React from 'react';

import { Payouts } from './Payouts';

export default function PayoutsWrapper() {

    // demo purposes: will come from database 
    const payouts = [
        // {
        //     id: 0,
        //     date: 'Mar 10, 2022',
        //     status: 'sent',
        //     price: '880',
        //     event: 'Nic Fanciulli Live',
        //     invoice: 1933142333743
        // },
        // {
        //     id: 2,
        //     date: 'Mar 10, 2022',
        //     status: 'sent',
        //     price: '880',
        //     event: 'Nic Fanciulli Live',
        //     invoice: 1933142333743
        // }
    ]

    return (
        <section className='wrapper'>
            <header className="section-header">
                <div className="section-heading section-heading--secondary">
                    <h1>Payouts</h1>
                </div>
                <p className='section-header-desc'>Keep track of when your money is being processed or has been sent</p>
            </header>
            <Payouts payouts={payouts} />
        </section>
    );
}
