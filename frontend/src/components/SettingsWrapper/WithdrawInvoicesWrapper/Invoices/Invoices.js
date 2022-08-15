import React from 'react';

import Table from 'react-bootstrap/Table';

import { InvoiceRow } from './InvoiceRow';

import './invoices.scss';

export default function Invoices({ details }) {
    return (
        <Table id="invoice-table">
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Invoice</th>
                </tr>
            </thead>
            <tbody>
                {details && details.map((detail, index) => (
                    <InvoiceRow key={index} invoice={detail} />
                ))}
            </tbody>
        </Table>
    );
}
