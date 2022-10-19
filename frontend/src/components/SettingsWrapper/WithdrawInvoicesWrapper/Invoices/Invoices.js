import React from 'react';

import Table from 'react-bootstrap/Table';

import { InvoiceRow } from './InvoiceRow';

import './invoices.scss';

export default function Invoices({ details }) {

    const sortBy = arr => {
        return arr?.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
    }
    return (
        <>
            {details.length === 0 ? (
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
                        {details && sortBy(details).map((detail, index) => (
                            <InvoiceRow key={index} invoice={detail} />
                        ))}
                    </tbody>
                </Table>
            ) : (
                <h1 className='text-center fs-md'>No invoices to show</h1>
            )}
        </>
    );
}
