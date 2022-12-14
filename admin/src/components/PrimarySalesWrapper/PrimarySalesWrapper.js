import React from 'react';

import { formatCurrency, formatNumber } from '../../utilities/helpers';

import Table from 'react-bootstrap/Table';

import { ExportBtn } from '../ExportBtn';

export default function PrimarySalesWrapper() {

    return (
        <>
            <section className='max-width-wrapper'>
                <header className='section-header'>
                    <div className="section-header" >
                        <div className="section-heading">
                            <h1>Sales Summary: Primary Tickets</h1>
                        </div>
                        <p className='section-header-desc'>Report generated from when sales started</p>
                    </div>
                    <div className="actions-group-flex">
                        <ExportBtn />
                    </div>
                </header>
                <div className="table-container">
                    <Table className=''>
                        <thead>
                            <tr>
                                <th>Ticket type</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Gross</th>
                                <th>Net sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>General Admission</td>
                                <td>{formatCurrency(40)}</td>
                                <td>{formatNumber(35)}</td>
                                <td>{formatCurrency(500)}</td>
                                <td>{formatCurrency(500)}</td>
                            </tr>
                            <tr>
                                <td>General Admission 1</td>
                                <td>{formatCurrency(40)}</td>
                                <td>{formatNumber(35)}</td>
                                <td>{formatCurrency(500)}</td>
                                <td>{formatCurrency(500)}</td>
                            </tr>
                            <tr>
                                <td>General Admission w/ Line Skip</td>
                                <td>{formatCurrency(40)}</td>
                                <td>{formatNumber(30)}</td>
                                <td>{formatCurrency(200)}</td>
                                <td>{formatCurrency(500)}</td>
                            </tr>
                            <tr className='total-row'>
                                <td colSpan={2}>Total</td>
                                <td>{formatNumber(155)}</td>
                                <td>{formatCurrency(6000)}</td>
                                <td>{formatCurrency(500)}</td>
                            </tr>
                            <tr className='total-row'>
                                <td colSpan={2}>Tickets remaining</td>
                                <td>{formatNumber(45)}</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr className='total-row'>
                                <td colSpan={2}>Capacity</td>
                                <td>{formatNumber(200)}</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

            </section>
        </>
    );
}
