import React from 'react';

import { SettingsWrapper } from '..';
import { WithdrawCards } from './WithdrawCards';
import { Invoices } from './Invoices';

import './withdrawInvoicesWrapper.scss';

export default function WithdrawInvoicesWrapper({ details }) {

    const sortBy = arr => {
        console.log(arr);
        return arr;
        // return arr.sort(function (a, b) {
        //     return new Date(a.createdAt) - new Date(b.createdAt)
        // })
    }

    return (
        <>
            <SettingsWrapper>
                <section id="withdraw">
                    <div className="settings-heading">
                        <h1 className="settings-title">Withdraw</h1>
                        <h2 className="settings-subtitle">Withdraw funds from your account.</h2>
                    </div>
                    <WithdrawCards />
                </section>
            </SettingsWrapper>
            <section id="invoices">
                <div id="invoices-heading-container">
                    <div className="settings-heading">
                        <h1 className="settings-title">Invoices</h1>
                        <h2 className="settings-subtitle">View / download your previous invoices and transactions below.</h2>
                    </div>
                </div>
                <Invoices details={sortBy(details)} />
            </section>
        </>
    );
}
